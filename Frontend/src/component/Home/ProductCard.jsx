import { NavLink } from "react-router-dom";
import Rating from "@mui/material/Rating";

function ProductCard(product) {
  const options = {
    size: "medium",
    value: product.ratings,
    precision: 0.5,
    readOnly: true,
  };

  // console.log(product);

  return (
    <NavLink className="productCard" to={`/product/${product._id}`}>
      {product.images?.length > 0 && (
        <img src={product.images[0].url} alt={product.name} />
      )}
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span>({product.numOfReviews})</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </NavLink>
  );
}

export default ProductCard;
