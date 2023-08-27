import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './UserForm.css';

function UserForm({ customer, logout }) {
    const [firstName, setFirstName] = useState(customer.firstName || '');
    const [lastName, setLastName] = useState(customer.lastName || '');
    const [email, setEmail] = useState(customer.email || '');
    const [phone, setPhone] = useState(customer.phone || '');
    const [gender, setGender] = useState(customer.gender || '');
    const [address, setAddress] = useState(customer.address || '');
    const [birthday, setBirthday] = useState(customer.birthday || '');

    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePhoneChange(event) {
        setPhone(event.target.value);
    }

    function handleGenderChange(event) {
        setGender(event.target.value);
    }

    function handleAddressChange(event) {
        setAddress(event.target.value);
    }

    function handleBirthdayChange(event) {
        setBirthday(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Lưu thông tin người dùng
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            gender: gender,
            address: address,
            birthday: birthday
        };
        customer.onSave(user);
    }
    
    const handleCancelEdit = () => {
        
    }

    return (
        <Container>
            <Form className="user-form" onSubmit={handleSubmit}>
                <h2>Thông tin người dùng</h2>
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
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Nhập email" value={email} onChange={handleEmailChange} />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>Số điện thoại:</Form.Label>
                    <Form.Control type="text" placeholder="Nhập số điện thoại" value={phone} onChange={handlePhoneChange} />
                </Form.Group>
                <Form.Group controlId="formGender">
                    <Form.Label>Giới tính:</Form.Label>
                    <Form.Control as="select" value={gender} onChange={handleGenderChange}>
                        <option value="">-- Chọn giới tính --</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>Địa chỉ:</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Nhập địa chỉ" value={address} onChange={handleAddressChange} />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label>Ngày sinh:</Form.Label>
                    <Form.Control type="date" placeholder="Nhập ngày sinh" value={birthday} onChange={handleBirthdayChange} />
                </Form.Group>
                <Row className="button-row">
                    {/* <Col>
                        <Button variant="primary" type="submit">
                            Lưu thông tin
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" onClick={handleCancelEdit}>
                            Hủy bỏ
                        </Button>
                    </Col> */}
                    <Col>
                        <Button variant="danger" onClick={logout}>
                            Đăng xuất
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default UserForm;