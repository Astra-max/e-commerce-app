import { useEffect, useState } from "react";
import { cartSelector, HandleCartFetch } from "../store/cartSlice";
import "../styles/home.css";
import store from "../store/store";
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
  const { productId }: any = useSelector(itemHistrySelector)
  const [index, setIndex] = useState(productId);
  const [product, setProduct] = useState(Items[productId]);

  const chooseRandom = (): number => {
    if (Items.length !== undefined) {
      return Math.floor(Math.round(Math.random() * Items.length - 1));
    }
    return 0;
  };

  useEffect(() => {
    function HandleRandomId() {
      const id = chooseRandom();
      if (id > 0 && token) {
        dispatch(setTemp(id))
        setIndex(id);
        return;
      }
    }

    setInterval(() => HandleRandomId(), 10000);

    if (productId !== 0) {
      setIndex(index);
      setProduct(Items[index]);
    }
  }, [token, index]);

  useEffect(() => {
    try {
      store.dispatch(HandleCartFetch(userId));
    } catch (error) {
      console.log(error);
    }
  }, [token, dispatch, cart.length]);

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
              <div>
                <button
                  className="view-more"
                  onClick={() => push(`/products/${product.productid}`)}
                >
                  view more
                </button>
              </div>
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

export function HomeProductCard({productId }: any) {
  const { Items } = useSelector(productSelector);
  const push = useNavigate()
  const product = Items[productId];
  return (
    <div className="home-card-cont">
      <div>
        <p style={{opacity: "0.7"}}>{product.category}</p>
      </div>
      <div>
        <p style={{fontWeight: "bold", opacity: "0.8", fontSize: "1.3rem"}}>{product.name}</p>
        <p className="views">200k views</p>
      </div>
      <div>
        <p style={{fontWeight: "bold",opacity: "0.8", fontSize: "1.3rem"}}>Kshs {product.amount}.00</p>
      </div>
      <div>
        <p className="card-v-more" onClick={()=>push(`/products/${product.productid}`)}>
          view more {'--->'}
        </p>
      </div>
    </div>
  );
}

export default Home;
