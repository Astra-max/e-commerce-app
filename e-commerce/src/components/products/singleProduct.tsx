import { useSelector } from "react-redux";
import { productSelector } from "../../store/feature/productSlice";
import { useParams } from "react-router-dom";
import { Products } from "../../../types";
import NotFound from "../ui/notFound";


export default function SingleProduct() {
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
