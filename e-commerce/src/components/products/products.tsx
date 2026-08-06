import { useSelector, useDispatch } from "react-redux";
import { Products } from "../../../types";
import "../../styles/poducts.css";
import { useEffect, useState } from "react";
import { getAllProducts, productSelector } from "../../store/feature/productSlice";
import ProductCard from "../../components/products/productCard";
import Loading from "../../components/ui/loading";
import { productCategory } from "../../data/product.data";


const PREVIEW_COUNT = 5;


/**
 * Handles products list: when browsing "All" with no search term, items are
 * grouped into per-category sections (first 5 items + "See more"), Amazon
 * style. Picking a specific category, clicking "See more", or typing a
 * search term switches to a single flat grid of every matching item.
 */
const ProductsList = () => {
  const { items, loading, hasMore } = useSelector(productSelector);
  const dispatch: any = useDispatch();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [hasObserved, setHasObserved] = useState(false);

n  useEffect(() => {
    if (items.length > 0) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasObserved) {
          setHasObserved(true);
          dispatch(getAllProducts({ limit: 10, offset: 0 }));
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

n    observer.observe(section);
    return () => observer.disconnect();
  }, [dispatch, hasObserved, items.length]);

  useEffect(() => {
    if (!hasMore || loading || items.length === 0) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatch(getAllProducts({ limit: 10, offset: items.length }));
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [dispatch, hasMore, loading, items.length]);

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  if (loading && items.length === 0) {
    return (
      <div className="product-section" ref={sectionRef}>
        <Loading message="Loading products..." />
      </div>
    );
  }

 // HANDLE fetch products by category
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
    <div className="product-section" ref={sectionRef}>
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
        {productCategory.map((val) => {
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
      <div ref={sentinelRef} className="loading-sentinel" />
    </div>
  );
};

export default ProductsList;