import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productSelector, getAllProducts } from "../../store/feature/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Products } from "../../../types";
import { authSelector } from "../../store/feature/authSlice";
import {
  addToCart,
  addToTotal,
  removeItem,
  addQuantity,
  reduceQuantity,
  reduceTotal,
  HandleAddItem,
} from "../../store/feature/cartSlice";
import { HandleGetTotal } from "../../store/feature/totalSlice";
import Loading from "../ui/loading";
import NotFound from "../ui/notFound";


export default function SingleProduct() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { items = [], loading } = useSelector(productSelector);
  const { user } = useSelector(authSelector);
  const userId = user?.userId ?? "";
  const cart = useSelector((state: any) => state.cart.cart as Products[]);
  const [adding, setAdding] = useState(false);
  const { productid } = useParams();

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getAllProducts({ limit: 10, offset: 0 }));
    }
  }, [items.length, dispatch]);

  const productId = String(productid);

  if (loading && items.length === 0) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <Loading message="Loading product details..." />
      </div>
    );
  }

  const product: Products | undefined = items.find(
    (product: Products) => product.productid === productId
  );

  if (product === undefined) {
    if (loading) {
      return <div style={{ padding: "4rem", textAlign: "center" }}>Loading product details...</div>;
    }
    return <NotFound message={"product"} />;
  }

  async function handleAddToCart() {
    if (!product) return;
    const { productid, name, category, image, amount, description } = product;
    const status = "cart";
    const quantity = 1;

    const existingIndex = cart.findIndex((item) => item.productid === productid);
    const wasInCart = existingIndex !== -1;

    if (!userId) {
      console.warn("Add to cart requires a logged in user");
      return;
    }

    setAdding(true);

    if (wasInCart) {
      dispatch(addQuantity(existingIndex));
    } else {
      dispatch(addToCart({
        ...product,
        quantity,
        status,
        userId,
      }));
    }
    dispatch(addToTotal(amount));

    try {
      const added = await dispatch(
        HandleAddItem({
          productid,
          name,
          category,
          image,
          amount,
          description,
          quantity,
          status,
          userId,
        })
      ).unwrap();
      if (added && userId) {
        dispatch(HandleGetTotal(userId));
      }
    } catch (error) {
      if (wasInCart) {
        dispatch(reduceQuantity(existingIndex));
      } else {
        dispatch(removeItem(productid));
      }
      dispatch(reduceTotal(amount));
      console.log("Failed to add to cart", error);
    } finally {
      setAdding(false);
    }
  }

  async function handleBuyNow() {
    await handleAddToCart();
    navigate("/cart");
  }

  return (
    <div className="s-p-page">
      <div className="s-p-card">
        {/* Left: image */}
        <div className="s-cd-img-cont">
          <ImageWithLoader
            className="s-cd-image"
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Middle: details */}
        <div className="s-p-info">
          <p className="s-p-category">{product.category}</p>
          <h1 className="singlecart-name">{product.name}</h1>

          <div className="s-p-rating">
            <span className="s-p-stars">★★★★☆</span>
            <span className="s-p-rating-count">128 ratings</span>
          </div>

          <hr className="s-p-divider" />

          <p className="s-p-price-tag">
            <span className="s-p-currency">Kshs</span>
            <span className="s-p-amount">{product.amount}</span>
            <span className="s-p-decimal">.00</span>
          </p>

          <hr className="s-p-divider" />

          <p className="s-p-about-title">About this item</p>
          <p className="s-p-desc-text">{product.description}</p>
        </div>

        {/* Right: buy box */}
        <div className="s-buybox">
          <p className="s-buybox-price">
            Kshs {product.amount}
            <span className="s-buybox-decimal">.00</span>
          </p>

          <p className="s-buybox-delivery">
            FREE delivery <span>Tomorrow</span>
          </p>

          <p className="s-buybox-stock">In Stock</p>

          <div className="s-btn-cont">
            <button
              className="s-btn purchase-item"
              disabled={adding}
              onClick={handleAddToCart}
            >
              {adding ? (
                <span className="loading-inline">
                  <span className="loading-spinner" /> Adding...
                </span>
              ) : (
                "Add to cart"
              )}
            </button>
            <button className="s-btn goto-cart" onClick={handleBuyNow}>Buy Now</button>
          </div>

          <p className="s-buybox-secure">🔒 Secure transaction</p>
        </div>
      </div>
    </div>
  );
}
