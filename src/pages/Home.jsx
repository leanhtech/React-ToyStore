import { Fragment, useContext, useEffect, useState } from "react"
import Wrapper from "../components/wrapper/Wrapper"
import Section from "../components/Section"
import {products ,discoutProducts } from "../utils/products"
import { DataContainer } from "../App"
import SliderHome from "../components/Slider"


const Home = () => {
  const {addToCart} =useContext(DataContainer);

  const [productsPromotion, setProductsPromotion] = useState([]);

  const [newProducts, setNewProducts] = useState([]);

  const [bestSellingProducts, setBestSellingProducts] = useState([]);


  useEffect(() => {
    window.scrollTo(0,0);

    fetch('http://localhost:8080/api/promotiontoys')
      .then(response => response.json())
      .then(data => setProductsPromotion(data))
      .catch(error => console.log(error));
    
    fetch('http://localhost:8080/api/newtoys')
    .then(response => response.json())
    .then(data => setNewProducts(data))
    .catch(error => console.log(error));

    fetch('http://localhost:8080/api/bestsellingtoys')
    .then(response => response.json())
    .then(data => setBestSellingProducts(data))
    .catch(error => console.log(error));

  }, []);

  return (
    <Fragment>
      <SliderHome/>
      <Wrapper /> 
      <Section title="Promotion" bgColor="#f6f9fc" productItems={productsPromotion} addToCart={addToCart}/>
      <Section title="New Toys" bgColor="white" productItems={newProducts} addToCart={addToCart}/>
      <Section title="Best Selling Toys" bgColor="#f6f9fc" productItems={bestSellingProducts} addToCart={addToCart}/>
    </Fragment>
  )
}

export default Home
