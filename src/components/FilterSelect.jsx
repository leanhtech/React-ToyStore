import Select from 'react-select';
//import { products } from '../utils/products';
import { useEffect, useState } from 'react';

const options = [
    { value: "http://localhost:8080/api/alltoy", label: "All" },
    { value: "http://localhost:8080/api/category/1", label: "Lắp Ráp" },
    { value: "http://localhost:8080/api/category/2", label: "Mô Hình" },
    // { value: "watch", label: "Watch" },
    // { value: "mobile", label: "Mobile" },
    // { value: "wireless", label: "Wireless" },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
            backgroundColor: "#0f3460",
            color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({ setFilterList }) => {
    const [productList, setProductList] = useState([]);
    const [selected, setSelected] = useState(options[0].value);

    useEffect(() => {
        fetch(selected)
            .then((response) => response.json())
            .then((data) => setProductList(data))
            .catch((error) => console.log(error));
    }, [selected]);

    const handleChange = (selectedOption) => {
        setSelected(selectedOption.value);
    };

    useEffect(() => {
        setFilterList(productList);
    }, [productList, setFilterList]);

    return (
        <Select
            options={options}
            defaultValue={options[0]}
            styles={customStyles}
            onChange={handleChange}
        />
    );
};

export default FilterSelect;
