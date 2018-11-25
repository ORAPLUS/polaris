require("isomorphic-fetch");
require("dotenv").config();

var client = require("redis").createClient(process.env.REDIS_URL);
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const path = require("path");
const logger = require("morgan");

const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("../config/webpack.config.js");

const ShopifyAPIClient = require("shopify-api-node");
const ShopifyExpress = require("shopify-express-rdj");
const { RedisStrategy } = require("shopify-express-rdj/strategies");

const {
  SHOPIFY_APP_KEY,
  SHOPIFY_APP_HOST,
  SHOPIFY_APP_SECRET,
  NODE_ENV
} = process.env;

const shopifyConfig = {
  host: SHOPIFY_APP_HOST,
  apiKey: SHOPIFY_APP_KEY,
  secret: SHOPIFY_APP_SECRET,
  scope: [
    "read_orders, write_orders, read_products, write_products, read_content, write_content, read_customers, write_customers, read_themes, write_themes, read_product_listings, read_script_tags, write_script_tags, read_resource_feedbacks, write_resource_feedbacks"
  ],
  accessMode: "offline",
  shopStore: new RedisStrategy(),
  afterAuth(request, response) {
    const {
      session: { accessToken, shop }
    } = request;

    return response.redirect("/");
  }
};

const app = express();
const isDevelopment = NODE_ENV !== "production";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(
  session({
    store: isDevelopment ? undefined : new RedisStore({ client: client }),
    secret: SHOPIFY_APP_SECRET,
    resave: true,
    saveUninitialized: false
  })
);

// Run webpack hot reloading in dev
if (isDevelopment) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    hot: true,
    inline: true,
    publicPath: config.output.publicPath,
    contentBase: "src",
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  const staticPath = path.resolve(__dirname, "../assets");
  app.use("/assets", express.static(staticPath));
}

// Install
app.get("/install", (req, res) => res.render("install"));

// Create shopify middlewares and router
const shopify = ShopifyExpress(shopifyConfig);

// Mount Shopify Routes
const { routes, middleware } = shopify;
const { withShop, withWebhook } = middleware;

app.use("/shopify", routes);

// Client
app.get("/", withShop({ authBaseUrl: "/shopify" }), function(
  request,
  response
) {
  const {
    session: { shop, accessToken }
  } = request;
  response.render("app", {
    title: "Shopify Node App",
    apiKey: shopifyConfig.apiKey,
    shop: shop
  });
});

// Error Handlers
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};

  response.status(error.status || 500);
  response.render("error");
});

module.exports = app;
