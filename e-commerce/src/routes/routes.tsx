import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout, { ProfileAccountLayout } from "../components/layout/layout";
import Home from "../view/home";
import NotFound from "../components/ui/notFound";
import ProductsList from "../components/products/products";
import SingleProduct from "../components/products/singleProduct";
import About from "../components/pages/4u";
import Cart, { ProductCart } from "../view/cart";
import SingleCartItem from "../components/cart/singleCardItem";
import Signup from "../components/auth/signup";
import Shipment from "../components/account/shipment";
import Login from "../components/auth/login";
import Subscribe from "../components/footer/subscribe";
import {
  AccountOverview,
  OrdersView,
  WishlistView,
  PaymentMethodsView,
  NotificationsView,
  SettingsView,
  HelpSupportView,
} from "../components/account/profileViews";



export default function AppBrowserRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
              <ProductsList />
              <Subscribe />
            </Layout>
          }
        ></Route>
        <Route
          path="/products/:productid"
          element={
            <Layout>
              <SingleProduct />
              <ProductsList />
            </Layout>
          }
        ></Route>
        <Route path="/auth/sign-up" element={<Signup />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route
          path="/All"
          element={
            <Layout>
              <Home />
              <ProductsList />
              <Subscribe />
            </Layout>
          }
        ></Route>
        <Route
          path={`/cart`}
          element={
            <Layout>
              <Cart />
              <ProductsList />
            </Layout>
          }
        ></Route>
        <Route
          path={`/cart/:productid`}
          element={
            <Layout>
              <SingleCartItem />
              <ProductsList />
            </Layout>
          }
        ></Route>
        <Route
          path={`/profile`}
          element={
            <ProfileAccountLayout>
              <AccountOverview />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/account`}
          element={
            <ProfileAccountLayout>
              <AccountOverview />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/orders`}
          element={
            <ProfileAccountLayout>
              <OrdersView />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/wishlist`}
          element={
            <ProfileAccountLayout>
              <WishlistView />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/cart`}
          element={
            <ProfileAccountLayout>
              <ProductCart />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/addresses`}
          element={
            <ProfileAccountLayout>
              <Shipment />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/payment-methods`}
          element={
            <ProfileAccountLayout>
              <PaymentMethodsView />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/notifications`}
          element={
            <ProfileAccountLayout>
              <NotificationsView />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/settings`}
          element={
            <ProfileAccountLayout>
              <SettingsView />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/help`}
          element={
            <ProfileAccountLayout>
              <HelpSupportView />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path="/Deals"
          element={
            <Layout>
              <ProductsList />
            </Layout>
          }
        ></Route>
        <Route
          path="/4You"
          element={
            <Layout>
              <About />
            </Layout>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}
