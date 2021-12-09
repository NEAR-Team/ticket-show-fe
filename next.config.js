const { utils } = require("near-api-js");

module.exports = {
  reactStrictMode: true,
  env: {
    CONTRACT_NAME: "ticket.xxxyyyzzz.testnet", //'ainetwork.testnet',
    domain: "http://localhost:3000",
    CONTRACT_CREATE_FEE: utils.format.parseNearAmount("11.5"),
  },
};
