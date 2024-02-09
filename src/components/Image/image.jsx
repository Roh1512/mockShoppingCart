import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Image({ className, url }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading image.</div>}
      <LazyLoadImage
        src={url}
        alt="Product"
        onLoad={handleLoad}
        onError={handleError}
        className={className}
      />
    </div>
  );
}

export default Image;
