import React, { useEffect, useState } from 'react';
import './MainPage.css';
import { CategoryModel } from '../../Models/Category.Model';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setProducts } from '../../store/productsReducer';
import Category from '../Category/Category';
import { ProductModel } from '../../Models/Product.Model';
import { Accordion, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyCart from '../myCart/MyCart'
import { showCheckoutPopup } from '../../store/checkoutPopupReducer';

const MainPage: React.FC = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const products = useSelector((state: RootState) => state.products.products);
    const search = useSelector((state: RootState) => state.search);

    const dispatch = useDispatch();

    useEffect(() => {
        getAllProduct();
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/categories');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched categories:', data);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const getAllProduct = async () => {
        try {
            const response = await fetch('http://localhost:5000/products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched products:', data);
            dispatch(setProducts({ products: data }));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div className="mainPage">
            <Accordion>
                {categories.map((category) => {
                    const filteredProducts = products.filter((product: ProductModel) => product.name.toLocaleLowerCase().includes(search.searchVal.toLocaleLowerCase()) && product.categoryID == category.id);
                    return (
                        <Accordion.Item eventKey={category.id.toString()} key={category.id.toString()}>
                            <Accordion.Header>
                                {category.name} - {filteredProducts.length} items
                            </Accordion.Header>
                            <Accordion.Body>
                                <Category category={category} items={filteredProducts} />
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
                <Accordion.Item eventKey={"my cart"} key={"my cart"}>
                    <Accordion.Header>
                        my cart
                        <div onClick={()=>dispatch(showCheckoutPopup())} className='finish'>Confirm Order</div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <MyCart />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br />
            {/* <MyCart /> */}
        </div>
    );
};

export default MainPage;
