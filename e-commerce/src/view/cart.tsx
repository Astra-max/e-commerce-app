import { useDispatch, useSelector } from "react-redux";
import { HandleAddTotal, HandleGetTotal, totalSelector } from "../store/totalSlice";
import {
  HandleAddQuantity,
  HandleReduceQuantity,
  decrementQuantity,
} from "../store/quantitySlice";
import { Products } from "../../types";
import "../styles/poducts.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addQuantity,
  addToTotal,
  cartSelector,
  HandleCartFetch,
  HandleRemoveItem,
  reduceTotal,
  removeItem,
} from "../store/cartSlice";
import { Fragment, Suspense, useEffect } from "react";
import store from "../store/store";
import { authSelector } from "../store/authSlice";
import { productSelector } from "../store/productSlice";

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

  function HandleRemoveProduct(productId: number) {
    const checkExists = cart.findIndex(
      (product: Products) => product.productid === productId
    );
    if (checkExists !== -1) {
      //dispatch(removeItemPrice(checkExists));
      dispatch(removeItem(productId));
      dispatch(HandleRemoveItem({ productId, userId }));
    }
  }

  function HandleAddQuant(productId: number, amount: number) {
    const index: number = cart.findIndex(
      (item: { productid: number }) => item.productid === productId
    );
    if (index !== -1) {
      dispatch(addToTotal(amount));
      dispatch(HandleAddTotal({userId, productId}))
      dispatch(addQuantity(index))
      //dispatch(incrementQuantity({cart,index}))
      dispatch(HandleAddQuantity({ userId, productId }));
    }
  }

  function HandleRemoveQuant(itemId: number, amount: number) {
    const index = cart.findIndex(
      (item: { productid: number }) => item.productid === itemId
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


  return (
    <Fragment>
      <div className="payable">
        <p className="total">
          Total Expenses: <span>kshs&nbsp;{total||0}</span>
        </p>
        <button className="purchase-all">Payment</button>
      </div>
      <div className="cart-cont">
        {cart.map((val: Products) => (
          <div className="cart-main" key={val.productid}>
            <div className="display-img-price">
              <img className="cart-image" src={val.image} alt="product image" />
              <div className="price-cont">
                <div className="cart-price-div">
                  <p className="cart-name">{val.name}</p>
                  <p className="cart-price">Kshs&nbsp;{val.amount||0}</p>
                  <p className="cart-quant">
                    Quantity&nbsp;
                    <span style={{ fontWeight: "bold" }}>{val.quantity}</span>
                  </p>
                </div>
                <div className="ct-btn-cont">
                  <button
                    className="c-btn remove-item"
                    onClick={() => HandleRemoveProduct(val.productid)}
                  >
                    Remove
                  </button>
                  <button
                    className="c-btn purchase"
                    onClick={() => HandleAddQuant(val.productid, val.amount)}
                  >
                    +
                  </button>
                  <button
                    className="c-btn purchase"
                    onClick={() => HandleRemoveQuant(val.productid, val.amount)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
            <div className="quantity">
              <Link
                to={`/cart/${userId}/${val.productid}`}
                className="see-more"
              >{`->`}</Link>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export function SingleItem() {
  const { productid } = useParams();
  const { cart } = useSelector(cartSelector);
  const { userId } = useSelector(authSelector);
  const { Items } = useSelector(productSelector);

  const nav = useNavigate();
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (userId) store.dispatch(HandleCartFetch(userId));
  }, [dispatch, cart.length]);

  const itemIndex = cart.findIndex(
    (item: { productid: number }) => item.productid === Number(productid)
  );
  if (itemIndex === -1)
    return (
      <div className="item-not-found">
        <p>Item {productid} not found</p>
      </div>
    );

  const item = cart[itemIndex];

  const HandleAddQuant = () => {
    dispatch(addToTotal(item.amount));
    dispatch(HandleAddTotal({userId, productId: item.productid}))
    dispatch(addQuantity(itemIndex));
    dispatch(HandleAddQuantity({ userId, productId: item.productid }));
  };

  const HandleRemoveQuant = () => {
    if (item.quantity > 1) {
      //dispatch(reduceTotal(item.amount));
      dispatch(decrementQuantity(item));
      dispatch(HandleReduceQuantity({ userId, itemId: item.productid }));
    }
  };

  return (
    <div className="single-main">
      <div className="single-cont" key={item.productid}>
        <div className="s-display-img-price">
          <div className="s-image-div">
            <img
              className="single-cart-image"
              src={item.image}
              alt="product image"
            />
          </div>
          <div className="single-price-cont">
            <div className="single-price-div">
              <p className="">{item.category}</p>
              <p className="singlecart-name">{item.name}</p>
              <p>{item.description}</p>
              <p className="single-cart-price">
                Number of item(s) {item.quantity}
              </p>
              <p className="single-cart-price">
                Amount {item.quantity} * {Items[itemIndex]?.amount} = Kshs{" "}
                {item.quantity * Items[itemIndex]?.amount}.00
              </p>
            </div>
            <div style={{ display: "flex", gap: "1rem", lineHeight: "0.1rem" }}>
              <p
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={HandleAddQuant}
              >
                +
              </p>
              <p
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={HandleRemoveQuant}
              >
                -
              </p>
            </div>
            <div className="s-btn-cont">
              <button className="s-btn purchase-item">Purchase Now</button>
              <button
                className="s-btn goto-cart"
                onClick={() => nav(`/cart/${userId}`)}
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

