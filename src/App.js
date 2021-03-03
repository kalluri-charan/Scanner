import React, { useCallback, useState} from 'react';
import './App.css';
import { ProductTable } from "./components/productTable";
import { Button, TextField, CircularProgress, Backdrop } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  scannerEntry: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`
  },
  errorMessage: {
    color: `red`,
    margin: `5px`,
    fontSize: `12px`
  },
  productTable: {
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    width: `90%`,
    margin: `auto`
  }
}));

const App = () => {
  const {productTable, backdrop, scannerEntry, errorMessage} = useStyles();
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState();
  const [scannedID, setScannedID] = useState('');
  const [addedProducts, setAddedProducts] = useState([]);

  // scanner observable can take this callback to add product to the list
  // Input ID should be between 1 t 1000
  const getProductInfo = useCallback(async (scannedValue) => {
    setIsSending(true);
    try {
      const res = await fetch(`http://localhost:3000/product/${scannedValue}`,  {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },});

      const data = await res.json();
      if (!res.ok) {
        setError(`Product Not Found`);
      } else {
        setError();
        setAddedProducts((addedProducts) => [...addedProducts, data]);
      }
    } catch (e) {
      setError(`Product Not Found`);
    } finally {
      setIsSending(false);
    }

  }, []);

  const handleChange = (event) => {
    setScannedID(event.target.value);
  };

  return (
      <div className="App">
        <h2>Product Scanner</h2>
          <div className={scannerEntry}>
            <TextField
                variant="outlined"
                placeholder="Product ID"
                onChange = {handleChange}
                value={scannedID}
            />
            <span className={errorMessage}>
              {error}
            </span>
            <Button variant="text"
                    color="primary"
                    onClick={() => getProductInfo(scannedID)}>
              Add Product
            </Button>
          </div>
        <div className={productTable}>
          <ProductTable productsInfo={addedProducts}/>
        </div>
        <Backdrop className={backdrop} open={isSending}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
  );
};

export default App;
