import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../redux/slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return error ? (
    <Message variant="danger">{error.data.message || error.error}</Message>
  ) : !isLoading && (
    <Carousel pause="hover" className="carousel-shopathon mb-4 mt-3" indicators={true}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} className="carousel-link">
            <div className="carousel-content">
              <div className="carousel-img-wrapper">
                <Image src={product.image} alt={product.name} className="carousel-image" />
              </div>
              <div className="carousel-info">
                <h3 className="carousel-product-name">{product.name}</h3>
                <span className="carousel-product-price">${product.price}</span>
                <div className="carousel-product-rating">
                  <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
                </div>
                <p className="carousel-product-desc">{product.description}</p>
              </div>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
