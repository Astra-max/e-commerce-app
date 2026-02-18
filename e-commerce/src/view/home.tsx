import { useEffect, useState } from "react";
import { cartSelector, HandleCartFetch } from "../store/cartSlice";
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../store/authSlice";
import { productSelector } from "../store/productSlice";
import { useNavigate } from "react-router-dom";
import { itemHistrySelector, setTemp } from "../store/itemHistorySlice";

const Home = () => {
  const dispatch = useDispatch();
  const push = useNavigate();

  const { userId, token } = useSelector(authSelector);
  const { cart } = useSelector(cartSelector);
  const { Items } = useSelector(productSelector);
  const { productId }: any = useSelector(itemHistrySelector);

  const [index, setIndex] = useState(productId || 0);
  const [product, setProduct] = useState(Items[productId] || {});

  /* -------------------------
     FIX 1: correct random
  -------------------------- */
  const chooseRandom = (): number => {
    if (!Items.length) return 0;
    return Math.floor(Math.random() * Items.length);
  };

  /* -------------------------
     Random rotate
  -------------------------- */
  useEffect(() => {
    function HandleRandomId() {
      const id = chooseRandom();

      if (token) {
        dispatch(setTemp(id));
        setIndex(id);
        setProduct(Items[id]);
      }
    }

    const interval = setInterval(HandleRandomId, 10000);

    return () => clearInterval(interval); // ⭐ FIX 2
  }, [token, Items]);

  /* -------------------------
     Update product when index changes
  -------------------------- */
  useEffect(() => {
    if (Items.length) {
      setProduct(Items[index]);
    }
  }, [index, Items]);

  /* -------------------------
     FIX 3: use dispatch not store.dispatch
  -------------------------- */
  useEffect(() => {
    if (token) {
      dispatch(HandleCartFetch(userId));
    }
  }, [token, userId, dispatch]);

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

/* ------------------------------------ */

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
