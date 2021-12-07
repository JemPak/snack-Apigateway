//call TypeDefs from every submodule
const authTypeDefs      = require('./auth_type_defs');
const contactTypeDefs   = require('./contact_type_defs');
const accountTypeDefs   = require('./account_type_defs');
const installTypeDefs   = require('./install_type_defs');
const productsTypeDefs  = require('./products_type_defs');
const machineTypeDefs   = require('./machine_type_defs');
const orderTypeDefs     = require('./order_type_defs');

//unit TypeDefs
const schemasArrays = [authTypeDefs, accountTypeDefs, contactTypeDefs,installTypeDefs, productsTypeDefs, machineTypeDefs, orderTypeDefs];

//Export TypeDefs
module.exports = schemasArrays;
