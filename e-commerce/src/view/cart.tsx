import { useDispatch, useSelector } from "react-redux";
import { HandleAddTotal, HandleGetTotal, totalSelector } from "../store/feature/totalSlice";
import {
  HandleAddQuantity,
  HandleReduceQuantity} from "../store/feature/quantitySlice";
import { Products } from "../../types";
import "../styles/poducts.css";
import { Link } from "react-router-dom";
import {
  addQuantity,
  addToTotal,
  cartSelector,
  HandleCartFetch,
  HandleRemoveItem,
  reduceTotal,
  removeItem,
} from "../store/feature/cartSlice";
import { Fragment, Suspense, useEffect } from "react";
import store from "../store/store";
import { authSelector } from "../store/feature/authSlice";


// Handles product cart
export const ProductCart = () => {
  const { cart, loading } = useSelector(cartSelector);
  const { total } = useSelector(totalSelector);
  const { userId } = useSelector(authSelector);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (userId) store.dispatch(HandleCartFetch(userId));
  }, [cart.length]);

  useEffect(() => {
    if (userId) dispatch(HandleGetTotal(userId));
  }, [total]);

  /**
   * Handles handle remove product
   */
  function HandleRemoveProduct(productId: string) {
    const checkExists = cart.findIndex(
      (product: Products) => product.productid === productId
    );
    if (checkExists !== -1) {
      //dispatch(removeItemPrice(checkExists));
      dispatch(removeItem(productId));
      dispatch(HandleRemoveItem({ productId, userId }));
    }
  }

  /**
   * Handles handle add quant
   */
  function HandleAddQuant(productId: string, amount: number) {
    const index: number = cart.findIndex(
      (item: { productid: string }) => item.productid === productId
    );
    if (index !== -1) {
      dispatch(addToTotal(amount));
      dispatch(HandleAddTotal({userId, productId}))
      dispatch(addQuantity(index))
      //dispatch(incrementQuantity({cart,index}))
      dispatch(HandleAddQuantity({ userId, productId }));
    }
  }

  /**
   * Handles handle remove quant
   */
  function HandleRemoveQuant(itemId: string, amount: number) {
    const index = cart.findIndex(
      (item: { productid: string }) => item.productid === itemId
    );
    if (index !== -1 && cart[index].quantity > 1) {
      dispatch(reduceTotal(amount));
      //dispatch(decrementQuantity(cart[index].quantity));
      dispatch(HandleReduceQuantity({ userId, itemId }));
    }
  }

  if (loading) return <p>Loading cart items.....</p>;

  if (cart.length === 0 && !loading) {
    return (
      <div className="cart-check">
        <p className="empty-cart">Your shopping basket is empty</p>
      </div>
    );
  }

  if (cart.length === 0 ) return (<p>Temporarily unavailable 503</p>)

  const itemCount = cart.reduce(
    (sum: number, val: Products) => sum + (val.quantity || 1),
    0
  );

  return (
    <Fragment>
      <div className="cart-page">
        <div className="cart-items-col">
          <div className="cart-items-header">
            <h1 className="cart-items-title">Shopping Basket</h1>
            <span className="cart-items-subtitle">Price</span>
          </div>
          <hr className="cart-divider" />

          <div className="cart-cont">
            {cart.map((val: Products) => (
              <Fragment key={val.productid}>
                <div className="cart-main">
                  <div className="display-img-price">
                    <Link to={`/cart/${userId}/${val.productid}`}>
                      <img
                        className="cart-image"
                        src={val.image}
                        alt="product image"
                      />
                    </Link>
                    <div className="price-cont">
                      <div className="cart-price-div">
                        <Link
                          to={`/cart/${userId}/${val.productid}`}
                          className="cart-name"
                        >
                          {val.name}
                        </Link>
                        <p className="cart-stock">In Stock</p>

                        <div className="ct-btn-cont">
                          <div className="qty-stepper">
                            <button
                              className="qty-btn"
                              onClick={() =>
                                HandleRemoveQuant(val.productid, val.amount)
                              }
                            >
                              −
                            </button>
                            <span className="qty-value">{val.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() =>
                                HandleAddQuant(val.productid, val.amount)
                              }
                            >
                              +
                            </button>
                          </div>

                          <span className="ct-sep">|</span>

                          <button
                            className="cart-link-btn remove-item"
                            onClick={() => HandleRemoveProduct(val.productid)}
                          >
                            Delete
                          </button>

                          <span className="ct-sep">|</span>

                          <Link
                            to={`/cart/${userId}/${val.productid}`}
                            className="cart-link-btn"
                          >
                            View details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="cart-line-price">
                    Kshs&nbsp;{(val.amount || 0) * (val.quantity || 1)}
                    <span className="cart-line-decimal">.00</span>
                  </p>
                </div>
                <hr className="cart-divider" />
              </Fragment>
            ))}
          </div>

          <div className="cart-grand-total">
            Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""}):{" "}
            <span>Kshs&nbsp;{total || 0}</span>
          </div>
        </div>

        <aside className="cart-summary-col">
          <div className="cart-summary-box">
            <p className="cart-summary-total">
              Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""}):{" "}
              <span>Kshs&nbsp;{total || 0}</span>
            </p>
            <label className="cart-summary-checkbox">
              <input type="checkbox" defaultChecked /> This order contains a
              gift
            </label>
            <button className="purchase-all">Proceed to checkout</button>
          </div>
        </aside>
      </div>
    </Fragment>
  );
};


// handle cart
function Cart() {
  return (
    <div className="cart-display">
      <Suspense fallback={<h2>Loading cart items....</h2>}>
        <ProductCart />
      </Suspense>
    </div>
  );
}

export default Cart;