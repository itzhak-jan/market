import React from 'react';
import { ProductModel } from '../../Models/Product.Model';
import './MyCart.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, deleteFromCart } from '../../store/cartReducer';

const MyCart: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);

    const onRemoveFromCartClicked = (item: ProductModel) => {
        dispatch(removeFromCart(item));
    }

    const onDeleteFromCartClicked = (item: ProductModel) => {
        dispatch(deleteFromCart(item));
    }

    return (
        <div className="myCart">
            <div className="cart-items">
                {items.length > 0 ? (
                    items.map(({ product, quantity }) => (
                        <div key={product.id.toString()} className="cart-item">
                            <h2 className='item-header'>{product.name}</h2>
                            <p>Category: {product.category}</p>
                            <p>Price: ${product.price}</p>
                            <p>Quantity: {quantity}</p>
                            {product.img && <img src={product.img} alt={product.name} className="product-image" />}
                            <button onClick={() => onRemoveFromCartClicked(product)} className="remove-from-cart-button">-</button>
                            <button onClick={() => onDeleteFromCartClicked(product)} className="delete-from-cart-button">🗑</button>
                        </div>
                    ))
                ) : (
                    <p>No items to display</p>
                )}
            </div>
        </div>
    );
};

export default MyCart;
