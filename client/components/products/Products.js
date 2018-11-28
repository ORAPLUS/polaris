import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import ProductFeed from "./ProductFeed";
import { getProducts } from "../../actions/productActions";
import {
  Page,
  // Loading,
  Layout,
  Avatar,
  ResourceList,
  TextStyle,
  Card
} from "@shopify/polaris";

class Products extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  state = {
    selectedItems: []
  };

  handleSelectionChange = selectedItems => {
    this.setState({ selectedItems });
  };

  renderItem = item => {
    const { id, url, name, location } = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
        <h3>
          <TextStyle variation="subdued">{name}</TextStyle>
        </h3>
      </ResourceList.Item>
    );
  };

  render() {
    const {
      products
      // , loading
    } = this.props.product;
    /* let productContent;

    if (products === null || loading) {
      productContent = <Loading />;
    } else {
      productContent = <ProductFeed products={products} />;
    }*/

    console.log(products);

    const resourceName = {
      singular: "product",
      plural: "products"
    };

    const items = [
      {
        id: 341,
        url: "products/341",
        name: "Mae Jemison",
        location: "Decatur, USA"
      },
      {
        id: 256,
        url: "products/256",
        name: "Ellen Ochoa",
        location: "Los Angeles, USA"
      }
    ];

    const promotedBulkActions = [
      {
        content: "Edit products",
        onAction: () => console.log("Todo: implement bulk edit")
      }
    ];

    const bulkActions = [
      {
        content: "Add tags",
        onAction: () => console.log("Todo: implement bulk add tags")
      },
      {
        content: "Remove tags",
        onAction: () => console.log("Todo: implement bulk remove tags")
      },
      {
        content: "Delete products",
        onAction: () => console.log("Todo: implement bulk delete")
      }
    ];

    return (
      <Page title="Products">
        <Layout sectioned>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={items}
              renderItem={this.renderItem}
              selectedItems={this.state.selectedItems}
              onSelectionChange={this.handleSelectionChange}
              promotedBulkActions={promotedBulkActions}
              bulkActions={bulkActions}
            />
          </Card>
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
