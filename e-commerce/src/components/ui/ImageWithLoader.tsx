import { useState, type CSSProperties } from "react";
import Loading from "./loading";
import "../../styles/loading.css";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const ImageWithLoader = ({
  src,
  alt,
  className,
  style,
  onClick,
}: ImageWithLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={className ? `image-loader-wrapper ${className}` : "image-loader-wrapper"} style={style}>
      {!loaded && !error && (
        <div className="image-skeleton" aria-busy="true">
          <Loading message="Loading image" inline />
        </div>
      )}
      {error ? (
        <div className="image-fallback">Image unavailable</div>
      ) : (
        <img
          src={src}
          alt={alt}
          aria-hidden={!loaded}
          className="image-with-loader"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          onClick={onClick}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.2s ease" }}
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
