import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useContext, useEffect, useState } from "react";
//import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import { DataContainer } from "../App";

const Shop = () => {
    const {addToCart} =useContext(DataContainer);
    const [filterList,setFilterList] = useState([]);

    useEffect(()=> {
        window.scrollTo(0,0);
        fetch('http://localhost:8080/api/alltoy')
        .then(response => response.json())
        .then(data => setFilterList(data))
        .catch(error => console.log(error));
    },[])
    return ( 
        <Fragment>
            <Banner title="product"/>
            <section className="filter-bar">
                <Container className="filter-bar-contianer">
                    <Row className="justify-content-center">
                        <Col md={4}>
                            <FilterSelect setFilterList={setFilterList}/>
                        </Col>
                        <Col md={8}>
                            <SearchBar setFilterList={setFilterList}/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <ShopList productItems={filterList} addToCart={addToCart}/>
                </Container>
            </section>
        </Fragment>
    );
}

export default Shop;