import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Products } from "../../../types";
import { authSelector } from "../../store/feature/authSlice";
import { HandleGetTotal } from "../../store/feature/totalSlice";
import {
  addToCart,
  addToTotal,
  HandleAddItem,
  HandleCartFetch,
  removeItem,
  addQuantity,
  reduceQuantity,
  reduceTotal,
} from "../../store/feature/cartSlice";

/**
 * Handles product card grid. Accepts the already-filtered list of items to
 * display so the parent (ProductsList) owns all category/search filtering
 * and section logic.
 */
export const ProductCard = ({ items }: { items: Products[] }) => {
  const [pid, setPid] = useState<string>("");
  const [leave, setLeave] = useState(false);
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const dispatch: any = useDispatch();
  const { user } = useSelector(authSelector);
  const userId = user?.userId ?? "";
  const cart = useSelector((state: any) => state.cart.cart as Products[]);
 
  const push = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(HandleCartFetch(userId));
    }
  }, [userId, dispatch]);

  /**
   * Handles handle add to cart
   */
  async function HandleAddToCart(product: Products) {
    const { productid, name, category, image, amount, description } = product;
    const status = "cart";
    const quantity = 1;

    if (!userId) {
      console.warn("Add to cart requires a logged in user");
      return;
    }

    const existingIndex = cart.findIndex((item) => item.productid === productid);
    const wasInCart = existingIndex !== -1;

    setAddingProductId(productid);

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

      if (added) {
        dispatch(HandleGetTotal(userId));
      }
    } catch (error) {
      if (wasInCart) {
        dispatch(reduceQuantity(existingIndex));
      } else {
        dispatch(removeItem(productid));
      }
      dispatch(reduceTotal(amount));
      console.error("Failed to add to cart", error);
    } finally {
      setAddingProductId(null);
    }
  }

  /**
   * Handles handle style
   */
  function HandleStyle(productId: string) {
    setLeave(false);
    setPid(productId);
  }

  /**
   * Handles handle mouse leave
   */
  function HandleMouseLeave() {
    setLeave(true);
  }

  if (items.length === 0) {
    return (
      <div className="no-results">
        <p>No products match your search.</p>
      </div>
    );
  }

  return (
    <>
      {items.map((val: Products) => {
        const styledCond =
          pid === val.productid && !leave ? "btn-cont-visible" : "btn-cont-";
        return (
          <div
            className="card-cont"
            key={val.productid}
            onClick={() => push(`/products/${val.productid}`)}
            onMouseEnter={() => HandleStyle(val.productid)}
            onMouseLeave={() => HandleMouseLeave()}
          >
            <div className="c-img-div">
              <img className="card-image" src={val.image} alt="product image" />
            </div>
            <div className="center-price">
              <div className="price-div">
                <p className="cd-category">{val.category}</p>
                <p className="name">{val.name}</p>
                <p className="price">Kshs {val.amount}.00</p>
              </div>
              <div className={styledCond}>
                <button
                  className="add-cart"
                  disabled={addingProductId === val.productid}
                  onClick={(e) => {
                    e.stopPropagation();
                    HandleAddToCart(val);
                  }}
                >
                  {addingProductId === val.productid ? (
                    <span className="loading-inline">
                      <span className="loading-spinner" /> Adding...
                    </span>
                  ) : (
                    "Add to cart"
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;