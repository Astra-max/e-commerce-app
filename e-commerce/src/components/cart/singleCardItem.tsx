import { useEffect } from "react";
import store from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartSelector, HandleCartFetch, addToTotal, addQuantity } from "../../store/feature/cartSlice";
import { authSelector } from "../../store/feature/authSlice";
import { productSelector } from "../../store/feature/productSlice";
import { HandleAddTotal } from "../../store/feature/totalSlice";
import {
  HandleAddQuantity,
  HandleReduceQuantity,
  decrementQuantity,
} from "../../store/feature/quantitySlice";

// single card item ui
export default function SingleCartItem() {
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
  const unitPrice = Items[itemIndex]?.amount ?? item.amount ?? 0;
  const lineTotal = item.quantity * unitPrice;

  /**
   * Handles handle add quant
   */
  const HandleAddQuant = () => {
    dispatch(addToTotal(item.amount));
    dispatch(HandleAddTotal({userId, productId: item.productid}))
    dispatch(addQuantity(itemIndex));
    dispatch(HandleAddQuantity({ userId, productId: item.productid }));
  };

  /**
   * Handles handle remove quant
   */
  const HandleRemoveQuant = () => {
    if (item.quantity > 1) {
      //dispatch(reduceTotal(item.amount));
      dispatch(decrementQuantity(item));
      dispatch(HandleReduceQuantity({ userId, itemId: item.productid }));
    }
  };

  return (
    <div className="s-p-page">
      <div className="s-p-card" key={item.productid}>
        {/* Left: image */}
        <div className="s-cd-img-cont">
          <img
            className="s-cd-image"
            src={item.image}
            alt="product image"
          />
        </div>

        {/* Middle: details */}
        <div className="s-p-info">
          <p className="s-p-category">{item.category}</p>
          <h1 className="singlecart-name">{item.name}</h1>

          <hr className="s-p-divider" />

          <p className="s-p-about-title">About this item</p>
          <p className="s-p-desc-text">{item.description}</p>

          <hr className="s-p-divider" />

          <p className="s-p-about-title">Quantity in cart</p>
          <div className="qty-stepper qty-stepper-lg">
            <button className="qty-btn" onClick={HandleRemoveQuant}>
              −
            </button>
            <span className="qty-value">{item.quantity}</span>
            <button className="qty-btn" onClick={HandleAddQuant}>
              +
            </button>
          </div>
        </div>

        {/* Right: buy box */}
        <div className="s-buybox">
          <p className="s-buybox-price">
            Kshs {lineTotal}
            <span className="s-buybox-decimal">.00</span>
          </p>
          <p className="s-buybox-unit-price">
            ({item.quantity} × Kshs {unitPrice}.00)
          </p>

          <p className="s-buybox-delivery">
            FREE delivery <span>Tomorrow</span>
          </p>

          <p className="s-buybox-stock">In Stock</p>

          <div className="s-btn-cont">
            <button className="s-btn purchase-item">Purchase Now</button>
            <button
              className="s-btn goto-cart"
              onClick={() => nav(`/cart/${userId}`)}
            >
              Go to Cart
            </button>
          </div>

          <p className="s-buybox-secure">🔒 Secure transaction</p>
        </div>
      </div>
    </div>
  );
}