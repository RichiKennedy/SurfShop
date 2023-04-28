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


const Layout = () => {
  return (
    <div className="app">
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
        path: "/products/:id",
        element: <Products />
      },
      {
        path: "/product/:id",
        element: <SingleProduct />
      },
    ]
  }
])

function App() {
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
