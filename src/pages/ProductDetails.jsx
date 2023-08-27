import { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { DataContainer } from "../App";
import { Col, Container, Row } from "react-bootstrap";
import ShopList from "../components/ShopList";
//import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = () => {
    // const [listSelected, setListSelected] = useState("desc");
    // const [relatedProducts, setRelatedProducts] = useState([]);
    const { selectedProduct, setSelectedProduct, addToCart } = useContext(DataContainer);
    // const [products, setProducts] = useState([]);
    
    const { sku } = useParams();
    if (!selectedProduct) {
        const storedProduct = localStorage.getItem(`selectedProduct-${sku}`);
        setSelectedProduct(JSON.parse(storedProduct));
    }
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        const updatedQuantity = Math.max(newQuantity, 1);
        setQuantity(updatedQuantity);
    };
    const handelAdd = (selectedProduct, quantity) => {
        addToCart(selectedProduct, quantity);
        toast.success("Product has been added to cart!");
    }

    const formattedValue = (value) => {
        return value.toLocaleString('vi-VN');
    };


    useEffect(() => {
        window.scrollTo(0, 0);

        // fetch('http://localhost:8080/api/alltoy')
        //     .then(response => response.json())
        //     .then(data => setProducts(data))
        //     .catch(error => console.log(error));

        //setRelatedProducts(products.filter(item => item.category === selectedProduct?.category && item.sku !== selectedProduct?.sku));
    }, [selectedProduct])
    return (
        <Fragment>
            <Banner title={selectedProduct?.productName} />
            <section className="product-page">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <img loading="lazy" src={selectedProduct?.image} alt="" />
                        </Col>
                        <Col md={6}>
                            <h2>{selectedProduct?.name}</h2>
                            <div className="info">
                                <span className="price">
                                    {selectedProduct?.percentDiscount !== null ?
                                        <span><del>{formattedValue(selectedProduct?.price)} VND</del> <br /> {formattedValue(selectedProduct?.price * (100 - selectedProduct?.percentDiscount) / 100.0)} VND ({selectedProduct?.percentDiscount}%Off)</span>
                                        :
                                        <span>{formattedValue(selectedProduct?.price)} VND</span>
                                    }
                                </span>
                                {/* <span>category:{selectedProduct?.category}</span> */}
                            </div>
                            <p>{selectedProduct?.description}</p>
                            <input className="qty-input" type="number" placeholder="Qty" value={quantity} onChange={handleQuantityChange} />
                            <button aria-label="Add" type="submit" className="add" onClick={() => handelAdd(selectedProduct, quantity)}>Add To Cart</button>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* <section className="product-reviews">
                <Container>
                    <ul>
                        <li style={{ color: listSelected === "desc" ? "black" : "#9c9b9b" }} onClick={() => setListSelected("desc")}>
                            Description
                        </li>
                        <li style={{ color: listSelected === "rev" ? "black" : "#9c9b9b" }} onClick={() => setListSelected("rev")}>
                            Reviews ({selectedProduct?.reviews.length})
                        </li>
                    </ul>
                    {listSelected === "desc" ?
                        <p>{selectedProduct?.description}</p> :
                        <div className="rates">
                            {selectedProduct?.reviews.map(rate => (
                                <div className="rate-comment" key={rate.rating}>
                                    <span>Jhon Doe</span>
                                    <span>{rate.rating} (rating)</span>
                                    <p>{rate.text}</p>
                                </div>
                            ))}
                        </div>
                    }
                </Container>
            </section>
            <section className="related-products">
                <Container>
                    <h3>You might also like</h3>
                </Container>
                <ShopList productItems={relatedProducts} addToCart={addToCart} />
            </section> */}
        </Fragment>
    );
}

export default ProductDetails;