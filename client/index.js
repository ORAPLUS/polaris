import * as React from "react";
import "isomorphic-fetch";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import App from "./App";

function renderApp() {
  render(
    <AppContainer>
      <Provider>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
}

renderApp();

if (module.hot) {
  module.hot.accept();
}
