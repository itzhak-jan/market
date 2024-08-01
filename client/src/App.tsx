import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './comp/header/Header';
import store, { RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './comp/mainPage/MainPage';
import CheckoutPopup from './comp/checkoutPopup/CheckoutPopup';
import AddProductPopup from './comp/addProductPopup/AddProductPopup';


function App() {
  const dispatch = useDispatch();

  const isCheckoutPopupVisible = useSelector((state: RootState) => state.popup.isCheckoutPopupVisible);
  const isAddProductPopupVisible = useSelector((state: RootState) => state.addProductPopup.isAddProductPopupVisible);

  return (
    <div className="App">
      <Header/>
      <MainPage/>
      {isCheckoutPopupVisible && <CheckoutPopup />}
      {isAddProductPopupVisible && <AddProductPopup />}
    </div>
  );
}

export default App;
