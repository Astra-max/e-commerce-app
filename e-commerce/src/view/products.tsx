import { useSelector, useDispatch } from "react-redux";
import { Products } from "../../types";
import "../styles/poducts.css";
import { useEffect, useState } from "react";
import {
  addToCart,
  addToTotal,
  HandleAddItem,
  HandleCartFetch,
} from "../store/cartSlice";
import { productSelector } from "../store/productSlice";
import { authSelector } from "../store/authSlice";
import store from "../store/store";
import { HandleGetTotal } from "../store/totalSlice";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../components/notFound";

export const ProductCard = () => {
  const [pid, setPid] = useState(0);
  const [leave, setLeave] = useState(false);
  const dispatch: any = useDispatch();
  const { Items } = useSelector(productSelector);
  const { userId } = useSelector(authSelector);

  const push = useNavigate();

  useEffect(() => {
    if (userId) {
      store.dispatch(HandleCartFetch(userId));
    }
  }, [userId]);

  async function HandleAddToCart(product: Products) {
    const { productid, name, category, image, amount, description } = product;
    const status = "cart";
    const quantity = 1;

    try {
      const added = dispatch(
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
        dispatch(addToCart({ ...product, quantity }));
        dispatch(HandleGetTotal(userId));
        dispatch(addToTotal(amount));
      }
    } catch (error) {
      console.log("Failed to add to cart", error);
    }
  }

  function HandleStyle(productId: number) {
    setLeave(false);
    setPid(productId);
  }

  function HandleMouseLeave() {
    setLeave(true);
  }

  return (
    <>
      {Items.map((val: Products) => {
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
                  onClick={() => HandleAddToCart(val)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const ProductsList = () => {
  const btnVals = [
    { id: 1, category: "All" },
    { id: 2, category: "Men's ware" },
    { id: 3, category: "Women's outfits" },
    { id: 4, category: "Electronics" },
    { id: 5, category: "Children's clothing" },
    { id: 6, category: "Utensils" },
    { id: 7, category: "Furniture" },
    { id: 8, category: "Food" },
    { id: 9, category: "Toys & Games" },
    { id: 10, category: "Bags" },
    { id: 11, category: "Sporting Equipments" },
    { id: 12, category: "Cosmetics" },
    { id: 13, category: "Tools" },
    { id: 14, category: "Construction Materials" },
    { id: 15, category: "Jewelleries" },
    { id: 16, category: "Home interior" },
    { id: 17, category: "others" },
  ];

  const [category, setCategory] = useState("All");

  function fetchCategory(cat: string) {
    setCategory(cat);
  }

  return (
    <div className="product-section">
      <p className="products-message">Shop our newest products</p>
      <div className="search-div">
        <input
          className="search-bar"
          type="search"
          placeholder={`Search ${
            category === "All" ? "products" : category
          }...`}
        />
      </div>
      <div className="product-category">
        {btnVals.map((val) => {
          const styledCond =
            category === val.category ? "active-category" : "inactive-category";
          return (
            <button
              key={val.id}
              className={styledCond}
              onClick={() => fetchCategory(val.category)}
            >
              {val.category}
            </button>
          );
        })}
      </div>
      <div className="cards-display">
        <ProductCard />
      </div>
    </div>
  );
};

export function SingleProduct() {
  const { Items } = useSelector(productSelector);
  const { productid } = useParams();
  const productId = Number(productid);
  const product: Products = Items.find(
    (product: Products) => product.productid === productId
  );
  if (product === undefined) return <NotFound message={"product"} />;
  return (
    <div className="s-p-card">
      <div className="s-cd-img-cont">
        <img className="s-cd-image" src={product.image} alt="product image" />
      </div>
      <div className="s-p-desc">
        <div>
          <p className="">{product.category}</p>
          <p className="singlecart-name">{product.name}</p>
          <p>{product.description}</p>
          <p className="single-cart-price">
            Price&nbsp;Kshs&nbsp;{product.amount}.00
          </p>
        </div>
        <div className="s-btn-cont">
          <button className="s-btn purchase-item">Add to cart</button>
          <button className="s-btn goto-cart">purchase</button>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
