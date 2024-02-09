import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types";
import LoaderAnimation from "../loaderAnimation/Loader";

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
      {isLoading && <LoaderAnimation />}
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

Image.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
};

export default Image;
