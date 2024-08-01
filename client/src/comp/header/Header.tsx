import React, { useState } from 'react';
import './Header.css';
import store, { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../store/searchReducer';
import { showAddProductPopup } from '../../store/addProductPopupReducer';

const Header: React.FC = () => {

    const dispatch = useDispatch();
    

    const searchChange = (value: string) => {
        dispatch(setSearch({ searchVal: value}));
    }

    return (
        <div className="header">
            <div className='search'>
                <input type="search" className="search-input" onChange={(e) => searchChange(e.target.value)} placeholder="search products" />
                <div onClick={()=>dispatch(showAddProductPopup())} className='addProduct'>Add Product</div>

            </div>
        </div>
    );
};

export default Header;
