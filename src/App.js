import { useState, createContext, useEffect, lazy, Suspense } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"))
const Shop = lazy(() => import("./pages/Shop"))
const Cart = lazy(() => import("./pages/Cart"))
const Account = lazy(() => import("./pages/Account"))
const ProductDetails = lazy(() => import("./pages/ProductDetails"))
const AdminPage = lazy(() => import("./components/Admin/AdminPage"))

export const DataContainer = createContext();

function App() {
  const [CartItem, setCartItem] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)

  const login = (userName, password) => {
    fetch(`http://localhost:8080/api/user/login?userName=${userName}&password=${password}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log(error));
    logoutAdmin()
  }

  const logout = () => {
    setUser(null)
  }


  const loginAdmin = (userName, password) => {
    fetch(`http://localhost:8080/api/admin/login?userName=${userName}&password=${password}`)
      .then(response => response.json())
      .then(data => setAdmin(data))
      .catch(error => console.log(error));
    logout()
  }

  const logoutAdmin = () => {
    setAdmin(null)
  }


  const addToCart = (product, num = 1) => {
    const productExit = CartItem.find((item) => item.sku === product.sku)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.sku === product.sku ? { ...productExit, qty: productExit.qty + num } : item)))
    } else {
      if (product.percentDiscount !== null)
        setCartItem([...CartItem, { ...product, qty: num, priceAfterDis: product.price * (100 - product?.percentDiscount) / 100.0 }])
      else
        setCartItem([...CartItem, { ...product, qty: num, priceAfterDis: product.price }])
    }
  }

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.sku === product.sku)
    // If product quantity == 1 then we have to remove it
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.sku !== product.sku))
    }
    //else we just decrease the quantity 
    else {
      setCartItem(CartItem.map((item) => (item.sku === product.sku ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  const deleteProduct = (product) => {
    setCartItem(CartItem.filter((item) => item.sku !== product.sku))
  }


  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(CartItem));
  }, [CartItem])

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user])

  return (
    <DataContainer.Provider value={{ CartItem, setCartItem, addToCart, decreaseQty, deleteProduct, selectedProduct, setSelectedProduct, login, logout, user, loginAdmin, logoutAdmin, admin }}>
      <Suspense fallback={<Loader />}>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {admin === null ? <NavBar /> : null}
          <Routes>
            
            <Route path="/">
              <Route path='' element={<Home />} />
              <Route path='shop' element={<Shop />} />
              <Route path='shop/:sku' element={<ProductDetails />} />
              <Route path='cart' element={<Cart />} />
              <Route path='account' element={<Account />} />
            </Route>
            <Route path="/admin">
              <Route index element={<AdminPage />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    </DataContainer.Provider>
  )
}

export default App
