import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "@shopify/polaris";
import store from "./store";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  const { apiKey, shopOrigin } = window;
  <AppProvider store={store} shopOrigin={shopOrigin} apiKey={apiKey}>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
registerServiceWorker();
