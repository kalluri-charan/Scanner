import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import TotalDialog from './totalDialog';
import '@testing-library/jest-dom/extend-expect'
const mockSetState = jest.fn();
describe('Test App', () => {

    test('Verify if product are retrieved on button click - success', async () => {

        jest.spyOn(React, 'useState')
            .mockImplementation(() => [false, mockSetState]);
        const {container} = render(<TotalDialog totalProductsValue={1500}/>);
        const checkOutButton = container.querySelector('#checkOut');
        checkOutButton.click();
        expect(mockSetState).toHaveBeenCalledWith(true);
    });

    test('Verify if product are retrieved on button click - success f', async () => {

        jest.spyOn(React, 'useState')
            .mockImplementation(() => [true, mockSetState]);
        const {getByTestId} = render(<TotalDialog totalProductsValue={1500}/>);
        const button = getByTestId('closeButton');
        fireEvent.click(button);
        expect(mockSetState).toHaveBeenCalledWith(false);
    });

});