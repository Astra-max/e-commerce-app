import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout, { ProfileAccountLayout } from "../components/ui/layout";
import Home from "./home";
import NotFound from "../components/ui/notFound";
import ProductsList, { SingleProduct } from "./products";
import About from "../components/4u";
import Cart, { SingleItem } from "./cart";
import Signup from "../components/auth/signup";
import Footer from "../components/footer/footer";
import ProfileAccount from "../components/account/user.account";
import { Fragment } from "react";
import Shipment from "../components/account/shipment";
import { useSelector } from "react-redux";
import { authSelector } from "../store/feature/authSlice";
import Login from "../components/auth/login";
import Subscribe from "../components/footer/subscribe";


export default function App() {
  const { userId } = useSelector(authSelector)
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
          path={`/cart/${userId}`}
          element={
            <Layout>
              <Cart />
              <ProductsList />
            </Layout>
          }
        ></Route>
        <Route
          path={`/cart/${userId}/:productid`}
          element={
            <Layout>
              <SingleItem />
              <ProductsList />
            </Layout>
          }
        ></Route>
        <Route
          path={`/profile/${userId}`}
          element={
            <ProfileAccountLayout>
              <p>Here</p>
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/${userId}/shipment`}
          element={
            <ProfileAccountLayout>
              <Shipment />
            </ProfileAccountLayout>
          }
        ></Route>
        <Route
          path={`/profile/${userId}/account`}
          element={
            <Fragment>
              <ProfileAccount />
              <Footer />
            </Fragment>
          }
        ></Route>
        <Route
          path={`/profile/${userId}/cart`}
          element={
            <Fragment>
              <ProfileAccount />
              <Footer />
            </Fragment>
          }
        ></Route>
        <Route
          path={`/profile/${userId}/marketing`}
          element={
            <Fragment>
              <ProfileAccount />
              <Footer />
            </Fragment>
          }
        ></Route>
        <Route
          path={`/profile/${userId}/track`}
          element={
            <Fragment>
              <ProfileAccount />
              <Footer />
            </Fragment>
          }
        ></Route>
        <Route
          path={`/profile/${userId}/shipment`}
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
