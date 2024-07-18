import Main from "./components/Main/Main";
import NotFound from "./pages/NotFound.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import RecoverPassword from "./pages/Recover-Password/Recover-Password.jsx";
import SearchPage from "./pages/SearchResultsPage/SearchResultsPage.jsx";
import ListaSerie from "./pages/ListaSerie.jsx";
import { AgregarSeriePage as DashboardAddSeriePage } from "./pages/AgregarSerie.jsx";
import DatosRegistro from "./pages/DatosRegistro.jsx";
import ContraOlvi from "./pages/ContraOlvi.jsx";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { ProductsPage as DashboardProductsPage } from "./pages/dashboard/ProductsPage";
import { ProductPage as DashboardProductPage } from "./pages/dashboard/ProductPage";
import { AgregarProductoPage as DashboardAddProductPage } from "./pages/dashboard/AgregarProducto";
import { Layout } from "./components/Layout";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderPage } from "./pages/OrderPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import { Providers } from "./providers";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

// admin pages
import UserList from "./routes/UserList.jsx";
import UserDetail from "./routes/UserDetail.jsx";
import OrderList from "./routes/OrderList.jsx";
import OrderDetail from "./routes/OrderDetail.jsx";

import "./App.css";
import "./tailwind.css";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <Layout>
          <Outlet />
        </Layout>
      </Providers>
    ),
    errorElement: (
      <Layout>
        <Providers>
          <NotFound />
        </Providers>
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/search-results",
        element: <SearchResultsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/recover-password",
        element: <RecoverPassword />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/dashboard/series",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ListaSerie />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/series/agregar",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardAddSeriePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/datos-registro",
        element: <DatosRegistro />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/products",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/products/:id",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/agregar",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardAddProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recover-password",
        element: <RecoverPassword />,
      },
      {
        path: "/contraolvi",
        element: <ContraOlvi />,
      },
      {
        path: "admin/users",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserList />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/users/:id",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/orders",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/orders/:id",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <OrderDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
