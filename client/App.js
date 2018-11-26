import React, { Component } from "react";
import { Page, AppProvider } from "@shopify/polaris";

class App extends Component {
  render() {
    const { apiKey, shopOrigin } = window;

    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <Page title="YouBB">
          Hello world!
        </Page>
      </AppProvider>
    );
  }
}

export default App;
