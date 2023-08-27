import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { DataContainer } from "../../App"
import './LoginForm.css';

function LoginForm({ login, customer }) {
  const { user } = useContext(DataContainer);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Kiểm tra thông tin đăng nhập
    login(username, password)
  }

  return (
    <Container>
      <Form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>
        <Form.Group controlId="formUsername">
          <Form.Label>Tên đăng nhập:</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên đăng nhập" value={username} onChange={handleUsernameChange} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Mật khẩu:</Form.Label>
          <Form.Control type="password" placeholder="Nhập mật khẩu" value={password} onChange={handlePasswordChange} />
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Đăng nhập
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" >
              Hủy bỏ
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default LoginForm;