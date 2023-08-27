import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Infor = ({ customer }) => {
    return(
    <Container>
        <Card>
            <Card.Header>
                <Card.Title>Thông tin người dùng</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col xs={4}><strong>Tên:</strong></Col>
                    <Col>{customer.firstName}</Col>
                </Row>
                <Row>
                    <Col xs={4}><strong>Email:</strong></Col>
                    <Col>{customer.email}</Col>
                </Row>
                <Row>
                    <Col xs={4}><strong>Số điện thoại:</strong></Col>
                    <Col>{customer.phone}</Col>
                </Row>
            </Card.Body>
        </Card>
    </Container >
    )
}

export default Infor;