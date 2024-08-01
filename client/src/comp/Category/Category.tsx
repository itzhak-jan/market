
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartReducer';
import React from 'react';
import { ProductModel } from '../../Models/Product.Model';
import { CategoryModel } from '../../Models/Category.Model';
import './Category.css';

interface CategoryProps {
    items: ProductModel[];
    category: CategoryModel;
}

const Category: React.FC<CategoryProps> = ({ category, items }) => {
    const dispatch = useDispatch();

    const onAddToCartClicked = (item: ProductModel) => {
        //console.log(item.name);
        dispatch(addToCart(item));
    };

    return (
        <div className="category">
            <div className="items">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id.toString()} className="item">
                            <h2 className='item-header'>{item.name}</h2>
                            <p>Category: {item.category}</p>
                            <p>Price: ${item.price}</p>
                            {item.img && <img src={item.img} alt={item.name} className="product-image" />}
                            <button onClick={() => onAddToCartClicked(item)} className="add-to-cart-button">Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No items to display</p>
                )}
            </div>
        </div>
    );
};

export default Category;

