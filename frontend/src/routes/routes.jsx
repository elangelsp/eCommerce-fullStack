import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/", 
        element: <HomePage />,
      },
      {
        path: "/login", 
        element: <LoginPage />,
      },
      {
        path: "/register", 
        element: <RegisterPage />,
      },
      {
        path:"/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
    ],
  },
]);