import { useContext, useState } from "react";
import { Col } from "react-bootstrap";
import "./product.css"
import { useNavigate } from "react-router-dom";
import { DataContainer } from "../../App";
import { toast } from "react-toastify";

const Product = ({title,productItem,addToCart}) => {
    const {setSelectedProduct} =useContext(DataContainer);
    const router =useNavigate();
    // const [count, setCount] = useState(0);
    // const increment = () => {
    //     setCount(count + 1)
    // }

    const formattedValue = (value) => {
        return value.toLocaleString('vi-VN');
    };
    
    const handelClick =()=> {
        setSelectedProduct(productItem);
        localStorage.setItem(`selectedProduct-${productItem.sku}`,JSON.stringify(productItem));
        router(`/shop/${productItem.sku}`);
    }
    const handelAdd =(productItem)=> {
        addToCart(productItem);
        toast.success("Product has been added to cart!");
    }
    return (
    <Col md={3} sm={5} xs={10} className="product mtop">
        {productItem.percentDiscount !== null ? <span className="discount">{productItem.percentDiscount}% Off</span>:null}
        <img loading="lazy" onClick={()=>handelClick()} src={productItem.image} alt=""/>
        {/* <div className="product-like">
            <label>{count}</label> <br />
            <ion-icon name="heart-outline" onClick={increment}></ion-icon>
        </div> */}
        <div className="product-details">
            <h3 onClick={()=>handelClick()}>
                {productItem.name}
            </h3>
        <div className="price">
            <h6>{productItem.percentDiscount !== null ?
                <span><del>{formattedValue(productItem.price)} VND</del> <br /> {formattedValue(productItem.price*(100 - productItem.percentDiscount)/100.0)} VND</span> 
                :
                <span>{formattedValue(productItem.price)} VND</span>
                }
            </h6>
            <button aria-label="Add" type="submit" className="add" onClick={() => handelAdd(productItem)}>
                <ion-icon name="add"></ion-icon>
            </button>
        </div>
    </div>
    </Col>
    );
};

export default Product;
