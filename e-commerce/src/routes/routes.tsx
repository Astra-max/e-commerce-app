import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout, { ProfileAccountLayout } from "../components/ui/layout";
import Home from "../view/home";
import NotFound from "../components/ui/notFound";
import ProductsList from "../components/products/products";
import SingleProduct from "../components/products/singleProduct";
import About from "../components/pages/4u";
import Cart from "../view/cart";
import SingleCartItem from "../components/cart/singleCardItem";
import Signup from "../components/auth/signup";
import Footer from "../components/footer/footer";
import ProfileAccount from "../components/account/user.account";
import { Fragment } from "react";
import Shipment from "../components/account/shipment";
import Login from "../components/auth/login";
import Subscribe from "../components/footer/subscribe";


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
              <p>Here</p>
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/shipment`}
          element={
            <ProfileAccountLayout>
              <Shipment />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/account`}
          element={
            <Fragment>
              <ProfileAccount />
              <Footer />
            </Fragment>
          }
        ></Route>
        <Route
          path={`/profile/cart`}
          element={
            <Fragment>
              <ProfileAccount />
              <Footer />
            </Fragment>
          }
        ></Route>
        <Route
          path={`/profile/marketing`}
          element={
            <Fragment>
              <ProfileAccount />
              <Footer />
            </Fragment>
          }
        ></Route>
        <Route
          path={`/profile/track`}
          element={
            <Fragment>
              <ProfileAccount />
              <Footer />
            </Fragment>
          }
        ></Route>
        <Route
          path={`/profile/shipment`}
          element={
            <Fragment>
              <ProfileAccount />
              <Footer />
            </Fragment>
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
