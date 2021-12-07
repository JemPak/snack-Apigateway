const { ApolloServer } = require("apollo-server");

const typeDefs       = require("./typeDefs");
const resolvers      = require("./resolvers");
const AuthAPI        = require("./dataSources/auth_api");
const AccountAPI     = require("./dataSources/account_api");
const ContactAPI     = require("./dataSources/contact_api");
const InstallAPI     = require("./dataSources/install_api");
const ProductAPI     = require("./dataSources/product_api");
const MachineAPI     = require("./dataSources/machine_api");
const OrderAPI       = require("./dataSources/order_api");
const authentication = require("./utils/authentication");

const server = new ApolloServer({
  context: authentication,
  typeDefs,
  resolvers,
  dataSources: () => ({
    accountAPI: new AccountAPI(),
    authAPI: new AuthAPI(),
    contactAPI: new ContactAPI(),
    installAPI: new InstallAPI(),
    productAPI: new ProductAPI(),
    machineAPI: new MachineAPI(),
    orderAPI: new OrderAPI(),
  }),
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
