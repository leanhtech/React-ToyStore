import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { Form, FormGroup, FormControl, FormLabel, Button, Table, Row, Col, Container, Image } from 'react-bootstrap';
//import './listorder.css';
import Popup from "reactjs-popup";

const formattedPrice = (value) => {
    return value.toLocaleString('vi-VN');
};

function OrderDetail({ products }) {
    // Tính tổng giá của các sản phẩm
    const total = products.reduce((acc, product) => {
        return acc + product.price * parseInt(product.quantity);
    }, 0);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>SKU</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>
                                <Image src={product.image} alt={product.name} width="50" rounded />
                            </td>
                            <td>{product.sku}</td>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{formattedPrice(product.price)} VND</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="3"></td>
                        <td className="text-right">
                            <strong>Total</strong>
                        </td>
                        <td className="text-right">
                            <strong>
                                {formattedPrice(total)} VND
                            </strong>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

const style = {
    "modal": {
        "fontSize": "12px"
    },
    "modal__header": {
        "width": "100%",
        "borderBottom": "1px solid gray",
        "fontSize": "18px",
        "textAlign": "center",
        "padding": "5px"
    },
    "modal__content": {
        "width": "100%",
        "padding": "10px 5px"
    },
    "modal__actions": {
        "width": "100%",
        "padding": "10px 5px",
        "textAlign": "center"
    },
    "modal__close": {
        "cursor": "pointer",
        "position": "absolute",
        "display": "block",
        "padding": "2px 5px",
        "lineHeight": "20px",
        "right": "-10px",
        "top": "-10px",
        "fontSize": "24px",
        "background": "#ffffff",
        "borderRadius": "18px",
        "border": "1px solid #cfcece"
    }
}

const FormNormal = ({ close, namePopup }) => {
    return (
        <div style={style.modal}>
            <a style={style.modal__close} onClick={close}>
                &times;
            </a>
            <div style={style.modal__header}> {namePopup} </div>
        </div>
    );
}

const FormInfor = ({ close, dataOrder, namePopup }) => {
    console.log(dataOrder)
    return (
        <div>
            < FormNormal close={close} namePopup={namePopup} />
            <div style={style.modal__content}>
                <h6>OrderId : {dataOrder?.customerOrderId}</h6>
                <h6>OrderCustomerId : {dataOrder?.customerId}</h6>
                <h6>Recipient Name : {dataOrder?.fristName + " " + dataOrder?.lastName}</h6>
                <h6>Recipient Phone : {dataOrder?.phone}</h6>
                <h6>Recipient Address : {dataOrder?.address}</h6>
                <h6>Status : {dataOrder?.status}</h6>
            </div>
        </div>
    );
}

const PopupDetailOrderCustomer = ({ close, dataOrder }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/admin/gettoysordercustomer?idOrder=${dataOrder.customerOrderId}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log("Call API Get Toy Bill Invoice error : ", error))
    }, [])



    const cancelOrder = async () => {
        const admin = JSON.parse(localStorage.getItem("admin"))
        let idDeliver = dataOrder.staffIdDeliver;
        if (idDeliver === null)
            idDeliver = admin.staffId;
        const data = {
            orderId: dataOrder.customerOrderId,
            staffId: admin.staffId,
            staffIdDeliver: idDeliver,
            status: "Cancel"
        }
        try {
            const response = await fetch('http://localhost:8080/api/admin/updateorder', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result)
            console.log(`API call CancelOrder successful. Response:`, result);
        } catch (error) {
            console.error(`API call CancelOrder failed. Error:`, error);
        }
    }

    const handleSubmit = () => {
        cancelOrder();
        close();
    }

    return (
        <div style={{backgroundColor: "lightskyblue"}}>
            <FormInfor close={close} dataOrder={dataOrder} namePopup={"Detail"} />
            <h5>List Product</h5>
            <OrderDetail products={products} />
            <Form onSubmit={handleSubmit}>
                <Row className="align-items-center">
                    <Col className="text-center mt-1" >
                        <Button variant="danger" type="submit" disabled={dataOrder.status === 'Done' || dataOrder.status === 'Cancel' || dataOrder.status === 'Delivering'}>
                            Cancel Order
                        </Button>
                    </Col>
                </Row>
            </Form>

        </div>
    );
}


const ListOrder = () => {

    const [load, setLoad] = useState(false);

    const ListButton = (p) => {
        const ableCancel = (p.data.status === 'Unpaid') || (p.data.status === "Paid")
        return (
            <>
                <Popup modal trigger={<Button>Detail</Button>}>
                    {close => <PopupDetailOrderCustomer close={close} dataOrder={p.data} setLoad={setLoad} />}
                </Popup>
                {/* {" "}
                {ableCancel ?
                    <Button>Cancel</Button>
                    : null
                } */}
            </>
        );
    }

    const [rowData, setRowData] = useState();

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Order ID', field: 'customerOrderId', sortable: true, maxWidth: 120 },
        { headerName: 'Status', field: 'status', filter: 'agTextColumnFilter', sortable: true },
        { headerName: 'Order Date', field: 'orderDate', filter: 'agDateColumnFilter', sortable: true },
        { headerName: 'First Name', field: 'fristName', sortable: true },
        { headerName: 'Phone', field: 'phone' },
        { headerName: 'Address', field: 'address' },
        { headerName: 'Acction', cellRenderer: ListButton }
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 200,
            resizable: true,
            floatingFilter: true,
        };
    }, []);



    const onGridReady = useCallback((params) => {
        fetch('http://localhost:8080/api/listorder/1')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
        console.log(rowData)
    }, [load]);

    return (
        <Container className="container">
            <h2 className="grid-title">Order List</h2>
            <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    pagination={true}
                    paginationPageSize={6}
                />
            </div>
        </Container>
    );
};

export default ListOrder;