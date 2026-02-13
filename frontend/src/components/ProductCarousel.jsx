import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductsQuery } from "../redux/slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return error ? (
    <Message variant="danger">{error.data.message || error.error}</Message>
  ) : !isLoading && (
    <Carousel pause="hover" className="bg-primary mb-4 mt-3">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid className="d-block mx-auto carousel-image" />
          </Link>
          <Carousel.Caption className="carousel-caption">
            <h2 className="text-white text-right">
              {product.name} (${product.price})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
