import { useState, useEffect } from "react";
import "./searchbar.css";
//import { products } from "../../utils/products";
const SearchBar = ({ setFilterList }) => {
    const [inputValue, setInputValue] = useState("");
    //const [products, setProducts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`http://localhost:8080/api/search?searchString=${inputValue}`)
        .then(response => response.json())
        .then(data => setFilterList(data))
        .catch(error => console.log(error));
      }, [inputValue]);

    const handelChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    }
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search..."
                // value={value}
                onChange={handelChange}
            />
            <ion-icon name="search-outline" className="search-icon"></ion-icon>
        </div>
    );
};

export default SearchBar;