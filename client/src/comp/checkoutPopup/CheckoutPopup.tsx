// CheckoutPopup.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { CartModelItem } from '../../Models/Cart.Model';
import { RootState } from '../../store';
import { hideCheckoutPopup } from '../../store/checkoutPopupReducer';
import './CheckoutPopup.css';
import { OrderModel } from '../../Models/order.Model';
import { setCart } from '../../store/cartReducer';

const CheckoutPopup: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [name, setName] = useState('');
    const [cardId, setCardId] = useState('');
    const [creditCard, setcreditCard] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const totalPrice = cartItems.reduce((total, item) =>
        total + item.quantity * item.product.price, 0);

    const validateInputs = () => {
        const newErrors: { [key: string]: string } = {};
        let isValid = true;

        if (name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
            isValid = false;
        }
        if (address.trim().length < 2) {
            newErrors.address = 'Address must be at least 2 characters long';
            isValid = false;
        }
        if (cardId.trim().length !== 9) {
            newErrors.cardId = 'Card ID must be exactly 9 digits';
            isValid = false;
        }
        if (creditCard.trim().length !== 16) {
            newErrors.creditCard = 'Credit card number must be exactly 16 digits';
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

        let params: OrderModel = {
            items: cartItems,
            name: name,
            address: address,
            cardId: cardId,
            creditCard: creditCard,
            totalPrice: totalPrice
        };

        sendOrder(params);
    };

    const sendOrder = async (order: OrderModel) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(order),
            redirect: "follow"
        };

        try {
            const response = await fetch("http://localhost:5000/orders", requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Get the PDF blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'receipt.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            alert("Order successfully completed, download receipt");
            dispatch(hideCheckoutPopup());
            dispatch(setCart({ items: [] }));
        } catch (error) {
            console.error('Error fetching receipt:', error);
            alert('Failed to generate receipt. Please try again.');
        }
    };


    return (
        <Modal show onHide={() => dispatch(hideCheckoutPopup())}>
            <Modal.Header closeButton>
                <Modal.Title>Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Items in your cart:</h5>
                <ul>
                    {cartItems.map((item: CartModelItem) => (
                        <li key={item.product.id}>
                            {item.product.name} - {item.quantity} x ${item.product.price} = ${item.quantity * item.product.price}
                        </li>
                    ))}
                    <li className='total-price'>Total price: ${totalPrice.toFixed(2)}</li>
                </ul>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className={errors.name ? 'error' : ''}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="formCardId" className={errors.cardId ? 'error' : ''}>
                        <Form.Label>Card ID</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your card ID"
                            value={cardId}
                            onChange={(e) => setCardId(e.target.value)}
                        />
                        {errors.cardId && <Form.Text className="text-danger">{errors.cardId}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="formCreditCard" className={errors.creditCard ? 'error' : ''}>
                        <Form.Label>Card ID</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your credit card"
                            value={creditCard}
                            onChange={(e) => setcreditCard(e.target.value)}
                        />
                        {errors.cardId && <Form.Text className="text-danger">{errors.cardId}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="formAddress" className={errors.address ? 'error' : ''}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && <Form.Text className="text-danger">{errors.address}</Form.Text>}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Confirm Order
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CheckoutPopup;
