import { useSelector, useDispatch } from "react-redux";
import { Products, ProductState } from "../../types";
import "../styles/poducts.css";
import { useEffect, useState } from "react";
import {
  addToCart,
  addToTotal,
  HandleAddItem,
  HandleCartFetch,
} from "../store/feature/cartSlice";
import { getAllProducts, productSelector } from "../store/feature/productSlice";
import { authSelector } from "../store/feature/authSlice";
import store from "../store/store";
import { HandleGetTotal } from "../store/feature/totalSlice";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../components/ui/notFound";

const PREVIEW_COUNT = 5;

/**
 * Handles product card grid. Accepts the already-filtered list of items to
 * display so the parent (ProductsList) owns all category/search filtering
 * and section logic.
 */
export const ProductCard = ({ items }: { items: Products[] }) => {
  const [pid, setPid] = useState<string>("");
  const [leave, setLeave] = useState(false);
  const dispatch: any = useDispatch();
  const { userId } = useSelector(authSelector);

  const push = useNavigate();

  useEffect(() => {
    if (userId) {
      store.dispatch(HandleCartFetch(userId));
    }
  }, [userId]);

  /**
   * Handles handle add to cart
   */
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
                  onClick={(e) => {
                    e.stopPropagation();
                    HandleAddToCart(val);
                  }}
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

/**
 * Handles products list: when browsing "All" with no search term, items are
 * grouped into per-category sections (first 5 items + "See more"), Amazon
 * style. Picking a specific category, clicking "See more", or typing a
 * search term switches to a single flat grid of every matching item.
 */
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

  const { items } = useSelector(productSelector);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  /**
   * Handles fetch category
   */
  function fetchCategory(cat: string) {
    setCategory(cat);
  }

  const isSearching = search.trim() !== "";
  const showSections = category === "All" && !isSearching;

  const filteredItems: Products[] = items.filter((item: Products) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sectionCategories: string[] = Array.from(
    new Set(items.map((item: Products) => item.category))
  );

  return (
    <div className="product-section">
      <p className="products-message">Shop our newest products</p>
      <div className="search-div">
        <input
          className="search-bar"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${category === "All" ? "products" : category
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

      {showSections ? (
        sectionCategories.map((cat) => {
          const catItems = items.filter(
            (item: Products) => item.category === cat
          );
          if (catItems.length === 0) return null;
          return (
            <section className="category-section" key={cat}>
              <div className="section-header">
                <h2 className="section-title">{cat}</h2>
                <button
                  className="see-more"
                  onClick={() => fetchCategory(cat)}
                >
                  See more
                </button>
              </div>
              <div className="cards-display">
                <ProductCard items={catItems.slice(0, PREVIEW_COUNT)} />
              </div>
            </section>
          );
        })
      ) : (
        <div className="cards-display">
          <ProductCard items={filteredItems} />
        </div>
      )}
    </div>
  );
};

/**
 * Handles single product
 */
export function SingleProduct() {
  const { items = [] } = useSelector(productSelector);
  const { productid } = useParams();
  const productId = String(productid)
  const product: Products = items.find(
    (product: Products) => product.productid === productId
  );
  if (product === undefined) return <NotFound message={"product"} />;

  return (
    <div className="s-p-page">
      <div className="s-p-card">
        {/* Left: image */}
        <div className="s-cd-img-cont">
          <img className="s-cd-image" src={product.image} alt="product image" />
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
            <button className="s-btn purchase-item">Add to cart</button>
            <button className="s-btn goto-cart">Buy Now</button>
          </div>

          <p className="s-buybox-secure">🔒 Secure transaction</p>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;