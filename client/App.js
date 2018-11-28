import React, { Component } from "react";
import ModeDevForm from "./components/ModeDevForm";
import HeaderForm from "./components/HeaderForm";
import HidePaypalCart from "./components/HidePaypalCartForm";
import HideShopifyPoweredByForm from "./components/HideShopifyPoweredByForm";
import {
  AppProvider,
  Navigation,
  TopBar,
  Card,
  ActionList,
  Loading,
  Layout,
  FormLayout,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
  Modal,
  TextField,
  Frame,
  SkeletonPage
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
  defaultState = {
    emailFieldValue: "Ayoub@youbb.us",
    nameFieldValue: "Ayoub Youb",
    dev: <ModeDevForm />,
    header: <HeaderForm />,
    hidePaypalCart: <HidePaypalCart />,
    hideShopifyPoweredBy: <HideShopifyPoweredByForm />
  };

  state = {
    isLoading: false,
    searchActive: false,
    searchText: "",
    showMobileNavigation: false,
    modalActive: false,
    supportSubject: "",
    supportMessage: "",
    loadingPage: ""
  };
  render() {
    const {
      isLoading,
      searchActive,
      searchText,
      showMobileNavigation,
      modalActive,
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

    const loadingMarkup = isLoading ? <Loading /> : null;

    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={9} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

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
              value={this.state.supportSubject}
              onChange={this.handleSubjectChange}
            />
            <TextField
              label="Message"
              value={this.state.supportMessage}
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
            {isLoading ? loadingPageMarkup : loadingPage}
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
            loadingPage: this.defaultState.dev
          });
          break;
        case "header":
          this.setState({
            isLoading: false,
            loadingPage: this.defaultState.header
          });
          break;
        case "paypal":
          this.setState({
            isLoading: false,
            loadingPage: this.defaultState.hidePaypalCart
          });
          break;
        case "shopify":
          this.setState({
            isLoading: false,
            loadingPage: this.defaultState.hideShopifyPoweredBy
          });
          break;
        default:
          this.setState({
            isLoading: false,
            loadingPage: this.defaultState.header
          });
          break;
      }
    };
  };
  toggleState = (key, value) => {
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

export default App;
