import { useEffect, useState } from "react";
import { HandleCartFetch } from "../store/feature/cartSlice";
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../store/feature/authSlice";
import { getAllProducts, productSelector } from "../store/feature/productSlice";
import { useNavigate } from "react-router-dom";
import { itemHistrySelector, setTemp } from "../store/feature/itemHistorySlice";

const ROTATE_MS = 10000;

// home page UI
const Home = () => {
  const dispatch = useDispatch<any>();
  const push = useNavigate();

  const { userId, token } = useSelector(authSelector);
  const { items } = useSelector(productSelector);
  const { productId }: any = useSelector(itemHistrySelector);

  const [index, setIndex] = useState<number>(productId ?? 0);
  const [fadeKey, setFadeKey] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(()=>{
    dispatch(getAllProducts())
  },[dispatch])

  const chooseRandom = (): number => {
    if (!items.length) return 0;
    return Math.floor(Math.random() * items.length);
  };

  /**
   * Handles switching the featured product. Used by both the auto-rotate
   * timer and the manual prev/next controls so every path stays in sync,
   * and bumps fadeKey so the image/text/card all replay their transition.
   */
  function goTo(id: number) {
    setIndex(id);
    setFadeKey((k) => k + 1);
    if (token) {
      dispatch(setTemp(id));
    }
  }

  function handlePrev() {
    if (!items.length) return;
    goTo((index - 1 + items.length) % items.length);
  }

  function handleNext() {
    if (!items.length) return;
    goTo((index + 1) % items.length);
  }

  /* Auto-rotate the featured product for everyone, not just logged-in
     users — a static hero is a weak first impression for guests. Pauses
     on hover, and restarts its 10s window whenever the product changes
     (auto or manual) since fadeKey is a dependency. */
  useEffect(() => {
    if (!items.length || paused) return;

    const interval = setInterval(() => {
      goTo(chooseRandom());
    }, ROTATE_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, paused, fadeKey, token]);

  /* fetch cart */
  useEffect(() => {
    if (token) {
      dispatch(HandleCartFetch(userId));
    }
  }, [token, userId, dispatch]);

  /* get current product safely */
  const product = items[index];

  /* prevent crash */
  if (!product) return null;

  return (
    <div className="home-main">
      <div
        className="home-display"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="h-cat-more">
          <div key={fadeKey} className="fade-slide-in">
            <p className="home-eyebrow">{product.category}</p>
            <p className="home-headline">{product.name}</p>
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

              {items.length > 1 && (
                <div className="hero-controls">
                  <div className="hero-progress">
                    <div
                      key={fadeKey}
                      className={`hero-progress-fill${
                        paused ? " paused" : ""
                      }`}
                      style={{ animationDuration: `${ROTATE_MS}ms` }}
                    />
                  </div>

                  <div className="hero-nav">
                    <button
                      type="button"
                      className="hero-nav-btn"
                      onClick={handlePrev}
                      aria-label="Previous featured product"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="hero-nav-btn"
                      onClick={handleNext}
                      aria-label="Next featured product"
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-card">
              <HomeProductCard key={fadeKey} productId={index} />
            </div>
          </div>
        </div>

        <div className="image-cont">
          <img
            key={fadeKey}
            className="home-image fade"
            src={product.image}
            alt={product.name}
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
  const { items = [] } = useSelector(productSelector);
  const push = useNavigate();

  const product = items[productId];

  if (!product) return null;

  return (
    <div className="home-card-cont fade-slide-in">
      <p style={{ opacity: 0.7 }}>{product.category}</p>

      <p style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
        {product.name}
      </p>

      <p className="views">200k views</p>

      <p style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
        Kshs {product.amount}.00
      </p>

      <button
        type="button"
        className="card-v-more"
        onClick={() => push(`/products/${product.productid}`)}
      >
        view more ---&gt;
      </button>
    </div>
  );
}

export default Home;