import React, { Component } from "react";
import { Page, AppProvider } from "@shopify/polaris";
import ApiConsole from "./ApiConsole";

class TestForm extends Component {
  render() {
    const { apiKey, shopOrigin } = window;

    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <Page
          title="My application"
          breadcrumbs={[{ content: "Home", url: "/foo" }]}
          primaryAction={{ content: "Add something" }}
        >
          <ApiConsole />
        </Page>
      </AppProvider>
    );
  }
}

export default TestForm;
