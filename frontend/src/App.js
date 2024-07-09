import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./Context/authContext";
import { CartProvider } from "./Context/cartContext";
import { FilterProvider } from './Context/filterContext';
import { ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Authentication/Login/Login";
import Logout from "./components/Authentication/Logout/Logout";
import Register from "./components/Authentication/Register/Register";
import Account from "./pages/Account/Account";
import SingleProduct from "./pages/Product/SingleProduct";
import Products from "./pages/Products/Products";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import './app.scss';
import { CheckoutProvider, useCheckoutContext } from "./Context/checkoutContext";

const Layout = () => {
  const { checkoutProcess } = useCheckoutContext();
  return (
    <div>
      { !checkoutProcess && <Navbar />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products/:category/:subCategory?/:fit?" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <AnimatePresence>
        <AuthProvider>
          <CheckoutProvider>
            <CartProvider>
              <FilterProvider>
                <Router>
                  <Layout />
                </Router>
                <ToastContainer />
              </FilterProvider>
            </CartProvider>
          </CheckoutProvider>
        </AuthProvider>
      </AnimatePresence>
    </div>
  );
}

export default App;
