const authResolver    = require("./auth_resolver");
const accountResolver = require("./account_resolver");
const contactResolver = require("./contact_resolver");
const installResolver = require("./install_resolver");
const machineResolver = require("./machine_resolver");
const productResolver = require("./product_resolver");
const orderResolver   = require("./order_resolver");

const lodash = require("lodash");

const resolvers = lodash.merge(
  authResolver,
  accountResolver,
  contactResolver,
  productResolver,
  installResolver,
  machineResolver,
  orderResolver,
);

module.exports = resolvers;
