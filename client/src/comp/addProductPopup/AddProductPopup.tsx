


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { CartModelItem } from '../../Models/Cart.Model';
import { RootState } from '../../store';
import { hideCheckoutPopup } from '../../store/checkoutPopupReducer';
import './AddProductPopup.css';
import { setCart } from '../../store/cartReducer';
import { ProductModel } from '../../Models/Product.Model';
import { hideAddProductPopup } from '../../store/addProductPopupReducer';

const AddProductPopup: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    const [categoryID, setCategoryID] = useState(0);
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const validateInputs = () => {
        const newErrors: { [key: string]: string } = {};
        let isValid = true;

        if (name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
            isValid = false;
        }
        if (price <= 0) {
            newErrors.price = 'Price must be positive';
            isValid = false;
        }
        if (category == "") {
            newErrors.category = 'Category must be selected';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }
        if (img == "") {
            setImg("https://shinua.co.il/wp-content/uploads/2022/12/%D7%A2%D7%92%D7%9C%D7%AA-%D7%A1%D7%95%D7%A4%D7%A8-%D7%9B%D7%95%D7%9C%D7%9C-%D7%A1%D7%9C%D7%A1%D7%9C%D7%95%D7%AA-%D7%A7%D7%91%D7%95%D7%A2%D7%95%D7%AA-1-500x632.png");
        }

        let params: ProductModel = {
            name: name,
            price: price,
            img: img,
            id: 0,
            category: category,
            categoryID: categoryID
        };

        addProduct(params);
    };

    const addProduct = async (order: ProductModel) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(order),
            redirect: "follow"
        };

        try {
            const response = await fetch("http://localhost:5000/products", requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            alert("Product successfully added")
            dispatch(hideAddProductPopup());
            window.location.reload(); 
        } catch (error) {
            console.error('Error fetching receipt:', error);
            alert('Failed to generate receipt. Please try again.');
        }
    };

    return (
        <Modal show onHide={() => dispatch(hideCheckoutPopup())}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className={errors.name ? 'error' : ''}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="formPrice" className={errors.price ? 'error' : ''}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter product price"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                        {errors.price && <Form.Text className="text-danger">{errors.price}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="formImg">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product image URL"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory" className={errors.category ? 'error' : ''}>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={categoryID}
                            onChange={(e) => {
                                const selectedCategoryID = Number(e.target.value);
                                const selectedCategory = categories.find(cat => cat.id === selectedCategoryID);
                                setCategoryID(selectedCategoryID);
                                setCategory(selectedCategory ? selectedCategory.name : '');
                            }}
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </Form.Control>
                        {errors.category && <Form.Text className="text-danger">{errors.category}</Form.Text>}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Product
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProductPopup;
