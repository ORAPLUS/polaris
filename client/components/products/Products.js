import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductFeed from "./ProductFeed";
import Skeleton from "../common/Skeleton";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productActions";
import { Page, Loading, Layout } from "@shopify/polaris";

class Products extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, loading } = this.props.product;
    let productContent;

    if (products === null || loading) {
      productContent = <Loading />;
    } else {
      productContent = <ProductFeed products={products} />;
    }

    return (
      <Page title="Products">
        <Layout sectioned>
          {productContent}
          {loading ? <Skeleton /> : null}
        </Layout>
      </Page>
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(Products);
