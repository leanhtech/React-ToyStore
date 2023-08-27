import { Col, Container, Row } from "react-bootstrap";
import { useNavigate  } from 'react-router-dom';
import "./slidercard.css";

const SlideCard = ({title,desc,cover}) => {
  const navigate = useNavigate();
  const handleShoppingNow = () => {
    navigate('/shop');
  };
  return (
      <Container className='box' >
        <Row>
          <Col md={6}>
            <h1>{title}</h1>
            <p>{desc}</p>
            <button className='btn-primary' onClick={handleShoppingNow} >Shopping Now</button>
          </Col>
          <Col md={6}>
            <img src={cover} alt="#" />
          </Col>
        </Row>

    </Container>
  )
}

export default SlideCard
