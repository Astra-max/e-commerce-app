import { useEffect, useState } from "react";
import {  HandleCartFetch } from "../store/cartSlice";
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../store/authSlice";
import { productSelector } from "../store/productSlice";
import { useNavigate } from "react-router-dom";
import { itemHistrySelector, setTemp } from "../store/itemHistorySlice";

/**
 * Handles home
 */
const Home = () => {
  const dispatch = useDispatch<any>();
  const push = useNavigate();

  const { userId, token } = useSelector(authSelector);
  //const { cart } = useSelector(cartSelector);
  const { Items } = useSelector(productSelector);
  const { productId }: any = useSelector(itemHistrySelector);

  const [index, setIndex] = useState<number>(productId ?? 0);

  const chooseRandom = (): number => {
    if (!Items.length) return 0;
    return Math.floor(Math.random() * Items.length);
  };

  useEffect(() => {
    /**
     * Handles handle random id
     */
    function HandleRandomId() {
      if (!Items.length) return;

      const id = chooseRandom();

      if (token) {
        dispatch(setTemp(id));
        setIndex(id);
      }
    }

    if (!token || !Items.length) return;

    const interval = setInterval(HandleRandomId, 10000);

    return () => clearInterval(interval);
  }, [token, Items, dispatch]);

  /* fetch cart */
  useEffect(() => {
    if (token) {
      dispatch(HandleCartFetch(userId));
    }
  }, [token, userId, dispatch]);

  /* get current product safely */
  const product = Items[index];

  /* prevent crash */
  if (!product) return null;

  return (
    <div className="home-main">
      <div className="home-display">
        <div className="h-cat-more">
          <div>
            <p className="offer-news">{product.category}</p>
            <p className="h-cd-desc">{product.description}</p>
          </div>

          <div className="h-more">
            <div>
              <p className="discount">Angukia Black Friday Offers</p>
              <p className="discount">Get upto 10% off discount</p>

              <button
                className="view-more"
                onClick={() => push(`/products/${product.productid}`)}
              >
                view more
              </button>
            </div>

            <div className="h-card">
              <HomeProductCard productId={index} />
            </div>
          </div>
        </div>

        <div className="image-cont">
          <img
            className="home-image"
            src={product.image}
            alt="product image"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Handles home product card
 */
export function HomeProductCard({ productId }: any) {
  const { Items } = useSelector(productSelector);
  const push = useNavigate();

  const product = Items[productId];

  if (!product) return null;

  return (
    <div className="home-card-cont">
      <p style={{ opacity: 0.7 }}>{product.category}</p>

      <p style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
        {product.name}
      </p>

      <p className="views">200k views</p>

      <p style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
        Kshs {product.amount}.00
      </p>

      <p
        className="card-v-more"
        onClick={() => push(`/products/${product.productid}`)}
      >
        view more ---&gt;
      </p>
    </div>
  );
}

export default Home;