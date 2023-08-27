import React, { useContext, useEffect, useState } from "react";
import { DataContainer } from "../App"
import { Col, Container, Row, Button, Form } from "react-bootstrap";

import { CLIENT_ID } from '../config/config';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
  const { CartItem, setCartItem, addToCart, decreaseQty, deleteProduct, user } = useContext(DataContainer);
  const totalPrice = CartItem.reduce((priceAfterDis, item) => priceAfterDis + item.qty * item.priceAfterDis, 0)
  useEffect(() => {
    window.scrollTo(0, 0);
    if (CartItem.length === 0) {
      const storedCart = localStorage.getItem("cartItem");
      setCartItem(JSON.parse(storedCart));
    }
  }, [])

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [priceT, setPriceT] = useState(totalPrice*1.0/23000);


  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }


  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }


  function handleAddressChange(event) {
    setAddress(event.target.value);
  }


  const formattedValue = (value) => {
    return value.toLocaleString('vi-VN');
  };


  useEffect(() => {
    setPriceT(totalPrice*1.0/23000)
  }, [CartItem])

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Toy",
          amount: {
            currency_code: "USD",
            value: totalPrice,
          },
        },
      ],
    }).then((orderID) => {
      setOrderID(orderID);
      return orderID;
    });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      callPostApiMultipleTimes();
      setSuccess(true);

    });
  };

  async function callPostApiMultipleTimes() {
    const data = {
      orderId:null,
      customerId: user.customerId,
      lastName: lastName,
      fristName: firstName,
      phone: phone,
      address: address,
      sku: CartItem[0].sku,
      quantity : CartItem[0].qty,
      price: CartItem[0].priceAfterDis
    }
    try {
      const response = await fetch('http://localhost:8080/api/ordercustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(`API call ${1} successful. Response:`, result);

      data.orderId = result.orderId
    } catch (error) {
      console.error(`API call ${1} failed. Error:`, error);
    }
    
    for (let i = 1; i < CartItem.length; i++) {
      data.sku= CartItem[i].sku
      data.quantity= CartItem[i].qty
      data.price= CartItem[i].priceAfterDis
      try {
        const response = await fetch('http://localhost:8080/api/ordercustomer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        console.log(`API call ${i + 1} successful. Response:`, result);
      } catch (error) {
        console.error(`API call ${i + 1} failed. Error:`, error);
      }
    }
  }

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      setCartItem([])
      console.log('Order successful . Your order id is--', orderID);
    }
  }, [success]);

  const handleCash = () =>{
    callPostApiMultipleTimes();
    setSuccess(true);
  }
  return (
    <section className='cart-items'>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {CartItem.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}
            {CartItem.map((item) => {
              const productQty = item?.percentDiscount !== null ? item?.price * (100 - item?.percentDiscount) / 100.0 : item.price * item.qty
              return (
                <div className='cart-list' key={item.sku}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.image} alt='' />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.name}</h3>
                          <h4>
                            {item?.percentDiscount !== null ?
                              <span>{formattedValue(item?.priceAfterDis)} VND ({item?.percentDiscount}%Off)</span>
                              :
                              <span>{formattedValue(item?.price)} VND</span>

                            }
                            * {item.qty}
                            <span>{formattedValue(productQty)} VND</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className='cartControl'>
                          <button className='incCart' onClick={() => addToCart(item)}>
                            <i className='fa-solid fa-plus'></i>
                          </button>
                          <button className='desCart' onClick={() => decreaseQty(item)}>
                            <i className='fa-solid fa-minus'></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button className="delete" onClick={() => deleteProduct(item)}>
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              )
            })}
            {true ? (
              <Form className="user-form" >
                <h2>Thông tin người nhận</h2>
                <Row>
                  <Col>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>Họ:</Form.Label>
                      <Form.Control type="text" placeholder="Nhập họ" value={firstName} onChange={handleFirstNameChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Tên:</Form.Label>
                      <Form.Control type="text" placeholder="Nhập tên" value={lastName} onChange={handleLastNameChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formPhone">
                  <Form.Label>Số điện thoại:</Form.Label>
                  <Form.Control type="text" placeholder="Nhập số điện thoại" value={phone} onChange={handlePhoneChange} />
                </Form.Group>
                <Form.Group controlId="formAddress">
                  <Form.Label>Địa chỉ:</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Nhập địa chỉ" value={address} onChange={handleAddressChange} />
                </Form.Group>
              </Form>
            ) : null}
          </Col>
          <Col md={4}>
            <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
              <div className='cart-total'>
                <h2>Cart Summary</h2>
                <div className=' d_flex'>
                  <h4>Total Price :</h4>
                  <h3>{formattedValue(totalPrice)} VND</h3>
                </div>
              </div>
              {show ? (
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              ) : <div>
                    <Button variant="primary" size="lg" onClick={() => setShow(true)}>PayPal</Button>
                    <Button style={{marginLeft: "10px"}} variant="primary" size="lg" onClick={handleCash}>Cash</Button>
                  </div>}
            </PayPalScriptProvider>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Cart
