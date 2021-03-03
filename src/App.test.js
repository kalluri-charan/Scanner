import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import App from './App';
import fetchMock from "fetch-mock";
import {waitFor} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
describe('Test App', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const setupUI = (id) => {
    fetchMock.mock(`http://localhost:3000/product/${id}`, {
      body:  {
        cost: 494,
        id: id,
        name: `product ${id}`
      },
      status: 200
    });

    const {getByText, getByPlaceholderText} = render(<App/>);
    fireEvent.change(getByPlaceholderText("Product ID"), {
      target: { value: id }
    });
    const button = getByText('Add Product');

    return {button, getByText}
  };

  test('Verify if product are retrieved on button click - success', async () => {

    const {button, getByText} = setupUI('123');
    await fireEvent.click(button);
    const productName = await waitFor(
        () => getByText('product 123')
    );
    expect(productName).toBeTruthy();
  });

  test('Verify if product are retrieved on button click - error', async () => {
    fetchMock.mock(
        'http://localhost:3000/product/123',
        Promise.reject('TypeError: Failed to fetch')
    );
    const {getByText, getByPlaceholderText} = render(<App/>);
    fireEvent.change(getByPlaceholderText("Product ID"), {
      target: { value: "123" }
    });
    const button = getByText('Add Product');
    await fireEvent.click(button);
    const errorMessage = await waitFor(
        () => getByText('Product Not Found')
    );
    expect(errorMessage).toBeTruthy();
  });

  test('Verify if product are retrieved on button click - error page not found', async () => {
    fetchMock.mock('http://localhost:3000/product/123', {
      status: 404
    });
    const {getByText, getByPlaceholderText} = render(<App/>);
    fireEvent.change(getByPlaceholderText("Product ID"), {
      target: { value: "123" }
    });
    const button = getByText('Add Product');
    await fireEvent.click(button);
    const errorMessage = await waitFor(
        () => getByText('Product Not Found')
    );
    expect(errorMessage).toBeTruthy();
  });
});