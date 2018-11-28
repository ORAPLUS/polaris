import React, { Component } from "react";
import PropTypes from "prop-types";
import Skeleton from "./components/common/Skeleton";
import { connect } from "react-redux";
import { getSettings } from "./actions/appActions";
import Products from "./components/products/Products";
import HeaderForm from "./components/header/HeaderForm";
import HidePaypalCartForm from "./components/paypal/HidePaypalCartForm";
import HideShopifyPoweredByForm from "./components/shopify/HideShopifyPoweredByForm";
import {
  AppProvider,
  Navigation,
  TopBar,
  Card,
  ActionList,
  Loading,
  FormLayout,
  Modal,
  TextField,
  Frame
} from "@shopify/polaris";
import "@shopify/polaris/styles.css";
import {
  devIcon,
  headerIcon,
  paypalIcon,
  shopifyIcon,
  bestIcon,
  cartstickyIcon,
  cartanimatedIcon,
  topIcon,
  currencyIcon,
  countdownIcon,
  paymentIcon,
  fbpixelIcon,
  relatedIcon,
  reviewsIcon
} from "./img/icons";

class App extends Component {
  componentDidMount() {
    this.props.getSettings();
  }
  // Constructor init
  constructor(props) {
    super(props);
    this.state = {
      searchActive: false,
      searchText: "",
      showMobileNavigation: false,
      modalActive: false,
      supportSubject: "",
      supportMessage: "",
      loadingPage: <HeaderForm />
    };
  }
  // Render App
  render() {
    // Get the list of Object props
    const { loading } = this.props.app;
    // Get States
    const {
      searchActive,
      searchText,
      showMobileNavigation,
      modalActive,
      supportSubject,
      supportMessage,
      loadingPage
    } = this.state;

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            {
              content: "Shopify help center"
            },
            {
              content: "Community forums"
            }
          ]}
        />
      </Card>
    );

    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={this.handleSearchFieldChange}
        value={searchText}
        placeholder="Search"
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={this.handleSearchResultsDismiss}
        onNavigationToggle={this.toggleState("showMobileNavigation")}
      />
    );

    const navigationMarkup = (
      <Navigation>
        <Navigation.Section
          title="Settings"
          items={[
            {
              label: "Mode DEV",
              icon: devIcon,
              onClick: this.toggleStateClick("dev")
            },
            {
              label: "Welcome Header Bar",
              icon: headerIcon,
              onClick: this.toggleStateClick("header")
            },
            {
              label: "Hide Paypal Cart",
              icon: paypalIcon,
              onClick: this.toggleStateClick("paypal")
            },
            {
              label: "Hide Powerd By Shopify",
              icon: shopifyIcon,
              onClick: this.toggleStateClick("shopify")
            },
            {
              label: "Hide Best Selling",
              icon: bestIcon,
              onClick: this.toggleStateClick("best")
            },
            {
              label: "Add To Cart Sticky",
              icon: cartstickyIcon,
              onClick: this.toggleStateClick("cartsticky")
            },
            {
              label: "Add To Cart Animated",
              icon: cartanimatedIcon,
              onClick: this.toggleStateClick("cartanimated")
            },
            {
              label: "Back To Top",
              icon: topIcon,
              onClick: this.toggleStateClick("top")
            },
            {
              label: "Currency Converter",
              icon: currencyIcon,
              onClick: this.toggleStateClick("currency")
            },
            {
              label: "Countdown Timer",
              icon: countdownIcon,
              onClick: this.toggleStateClick("countdown")
            },
            {
              label: "Payment Icons",
              icon: paymentIcon,
              onClick: this.toggleStateClick("payment")
            },
            {
              label: "Facebook Multi Pixel's",
              icon: fbpixelIcon,
              onClick: this.toggleStateClick("fbpixel")
            },
            {
              label: "Related Products",
              icon: relatedIcon,
              onClick: this.toggleStateClick("related")
            },
            {
              label: "YouBB Reviews",
              icon: reviewsIcon,
              onClick: this.toggleStateClick("reviews")
            }
          ]}
        />
        <Navigation.Section
          title="Support"
          items={[
            {
              label: "Help center",
              icon: "help",
              onClick: this.toggleStateClick("help")
            }
          ]}
          separator
          action={{
            icon: "conversation",
            accessibilityLabel: "Contact support",
            onClick: this.toggleState("modalActive")
          }}
        />
      </Navigation>
    );

    const loadingMarkup = loading ? <Loading /> : null;

    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={this.toggleState("modalActive")}
        title="Contact support"
        primaryAction={{
          content: "Send",
          onAction: this.toggleState("modalActive")
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Subject"
              value={supportSubject}
              onChange={this.handleSubjectChange}
            />
            <TextField
              label="Message"
              value={supportMessage}
              onChange={this.handleMessageChange}
              multiline
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );

    const theme = {
      colors: {
        topBar: {
          background: "#357997"
        }
      },
      logo: {
        width: 124,
        topBarSource:
          "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg",
        contextualSaveBarSource:
          "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg",
        url: "https://youbb.us",
        accessibilityLabel: "YouBB"
      }
    };

    return (
      <div style={{ height: "500px" }}>
        <AppProvider theme={theme}>
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState("showMobileNavigation")}
          >
            {loadingMarkup}
            {loading ? <Skeleton /> : loadingPage}
            {modalMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }

  toggleStateClick = value => {
    return () => {
      switch (value) {
        case "dev":
          this.setState({
            isLoading: false,
            loadingPage: <Products />
          });
          break;
        case "header":
          this.setState({
            isLoading: false,
            loadingPage: <HeaderForm />
          });
          break;
        case "paypal":
          this.setState({
            isLoading: false,
            loadingPage: <HidePaypalCartForm />
          });
          break;
        case "shopify":
          this.setState({
            isLoading: false,
            loadingPage: <HideShopifyPoweredByForm />
          });
          break;
        default:
          this.setState({
            isLoading: false,
            loadingPage: <HeaderForm />
          });
          break;
      }
    };
  };
  toggleState = key => {
    return () => {
      this.setState(prevState => ({ [key]: !prevState[key] }));
    };
  };

  handleSearchFieldChange = value => {
    this.setState({ searchText: value });
    if (value.length > 0) {
      this.setState({ searchActive: true });
    } else {
      this.setState({ searchActive: false });
    }
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: ""
      };
    });
  };

  handleSubjectChange = supportSubject => {
    this.setState({ supportSubject });
  };

  handleMessageChange = supportMessage => {
    this.setState({ supportMessage });
  };
}

App.propTypes = {
  getSettings: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

export default connect(
  mapStateToProps,
  { getSettings }
)(App);
