import React, { Component } from "react";
import PropTypes from "prop-types";
import IndexPagination from "../common/IndexPagination";
import { addsIcon } from "../../img/icons";
import {
  ResourceList,
  TextStyle,
  Pagination,
  Card,
  Avatar,
  Modal,
  FormLayout,
  TextField
} from "@shopify/polaris";

class ProductFeed extends Component {
  // Constructor init
  constructor(props) {
    super(props);
    this.state = {
      productTitle: "",
      productBody: "",
      productType: "",
      modalActive: false,
      selectedItems: [],
      sortValue: "DATE_MODIFIED_DESC",
      searchValue: "",
      isFirstPage: true,
      isLastPage: false
    };
  }
  // Render of the component
  render() {
    // Get the list of Object props
    const { products } = this.props;
    // Get States
    const {
      productTitle,
      productBody,
      productType,
      modalActive,
      selectedItems,
      sortValue,
      searchValue,
      isFirstPage,
      isLastPage
    } = this.state;
    // Model Add
    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={this.toggleState("modalActive")}
        title="Add Product"
        primaryAction={{
          content: "Save",
          onAction: this.toggleState("modalActive")
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Title"
              value={productTitle}
              onChange={this.handleProductTitle}
            />
            <TextField
              label="Body"
              value={productBody}
              onChange={this.handleProductBody}
              multiline
            />
            <TextField
              label="Type"
              value={productType}
              onChange={this.handleProductType}
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );
    // Pagination Markup
    const paginationMarkup =
      products.length > 0 ? (
        <IndexPagination>
          <Pagination
            hasPrevious={!isFirstPage}
            hasNext={!isLastPage}
            onPrevious={this.handlePreviousPage}
            onNext={this.handleNextPage}
          />
        </IndexPagination>
      ) : null;
    // Resource Name of the List
    const resourceName = {
      singular: "product",
      plural: "products"
    };
    // Option of sort
    const sortOptions = [
      { label: "Newest", value: "DATE_MODIFIED_DESC" },
      { label: "Oldest", value: "DATE_MODIFIED_ASC" },
      { label: "Price: Low to High", value: "PRICE_ASC" },
      { label: "Price: High to Low", value: "PRICE_DESC" },
      { label: "Last name A–Z", value: "ALPHABETICAL_ASC" },
      { label: "Last name Z–A", value: "ALPHABETICAL_DESC" }
    ];
    // Return Main
    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={products}
          renderItem={this.renderItem}
          selectedItems={selectedItems}
          onSelectionChange={this.handleSelectionChange}
          promotedBulkActions={[
            { content: "Edit", onAction: this.handleBulkEdit },
            { content: "Delete", onAction: this.handleBulkDelete }
          ]}
          bulkActions={[
            { content: "Action 1", onAction: this.handleBulkDelete },
            { content: "Action 2", onAction: this.handleBulkDelete },
            { content: "Action 3", onAction: this.handleBulkDelete }
          ]}
          sortOptions={sortOptions}
          sortValue={sortValue}
          onSortChange={this.handleSortChange}
          filterControl={
            <ResourceList.FilterControl
              resourceName={resourceName}
              searchValue={searchValue}
              onSearchChange={this.handleSearchChange}
              additionalAction={{
                content: "Product",
                icon: addsIcon,
                onAction: this.toggleState("modalActive")
              }}
            />
          }
          hasMoreItems
        />
        {paginationMarkup}
        {modalMarkup}
      </Card>
    );
  }
  // Render Item of the Resource List
  renderItem = item => {
    const { id, title, body_html, product_type } = item;
    const media = <Avatar customer size="medium" name="Mae Jemison" />;
    return (
      <ResourceList.Item
        id={id}
        media={media}
        accessibilityLabel={`View details for ${title}`}
      >
        <h3>
          <TextStyle variation="strong">{title}</TextStyle>
        </h3>
        <div>{body_html}</div>
        <h3>
          <TextStyle variation="subdued">{product_type}</TextStyle>
        </h3>
      </ResourceList.Item>
    );
  };
  // Togle State Key
  toggleState = key => {
    return () => {
      this.setState(prevState => ({ [key]: !prevState[key] }));
    };
  };
  // Handle Add
  handleProductTitle = productTitle => {
    this.setState({ productTitle });
  };
  handleProductBody = productBody => {
    this.setState({ productBody });
  };
  handleProductType = productType => {
    this.setState({ productType });
  };
  // Handle select item in the resourceList
  handleSelectionChange = selectedItems => {
    this.setState({ selectedItems });
  };
  // Handle Add Product
  handleAddProduct = () => {};
  // Pagination Previous Page
  handlePreviousPage = () => {
    const items = this.props.products;
    this.setState({ items, isFirstPage: true, isLastPage: false });
  };
  // Pagination Next Page
  handleNextPage = () => {
    const items = this.props.products;
    this.setState({ items, isFirstPage: false, isLastPage: true });
  };
  // Handle Search
  handleSearchChange = searchValue => {
    const items = this.props.products;
    this.setState({ items, searchValue });
  };
  // Handle Sort
  handleSortChange = sortValue => {
    const items = this.props.products;
    this.setState({ items, sortValue });
  };
  // Handle Bulk Edit
  handleBulkEdit = () => {
    console.log("Opening bulk editor…");
  };
  // Handle Action of Add Tags
  handleBulkAddTags = () => {
    console.log("Asynchronously adding tags to customers…");
  };
  // Handle Action of Delete Tags
  handleBulkRemoveTags = () => {
    console.log("Removing tags from customers…");
  };
  // Handle Remove All
  handleBulkDelete = () => {
    console.log("Handling bulk customer deletion…");
  };
}
// PropTypes Code quality
ProductFeed.propTypes = {
  products: PropTypes.array.isRequired
};
// Default Export
export default ProductFeed;
