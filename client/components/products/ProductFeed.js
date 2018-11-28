import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";

class ProductFeed extends Component {
  render() {
    const { products } = this.props;

    return products.map(product => (
      <ProductItem key={product._id} product={product} />
    ));
  }
}

ProductFeed.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductFeed;
