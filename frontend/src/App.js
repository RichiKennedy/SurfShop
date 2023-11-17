import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom"
import SingleProduct from "./pages/Product/SingleProduct"
import Products from "./pages/Products/Products";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import './app.scss'
import Dropdown from "./components/Navbar/NewNav/Dropdown";
import { AnimatePresence } from "framer-motion";
import { AppProvider } from "./Context/cartContext";



const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products/:category/:subCategory",
        element: <Products />
      },
      {
        path: "/product/:id",
        element: <SingleProduct />
      },
    ]
  },
  {
    path: "/about",
    element: <Dropdown />
  }
])

function App() {
  return (
    <div className="app">
      <AnimatePresence>
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </AnimatePresence>
    </div>
  );
}

export default App;
