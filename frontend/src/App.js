import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import SingleProduct from "./pages/Product/SingleProduct"
import Products from "./pages/Products/Products";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home />
  },
  {
    path:"/products/:id",
    element:<Products />
  },
  {
    path:"/product/:id",
    element:<SingleProduct />
  },
])

function App() {
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
