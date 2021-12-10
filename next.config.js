const { utils } = require("near-api-js");

module.exports = {
  reactStrictMode: true,
  env: {
    CONTRACT_NAME: "ainetwork.testnet",
    domain: "http://localhost:3000",
    CONTRACT_CREATE_FEE: utils.format.parseNearAmount("11.5"),
  },
  async redirects() {
    return [
      {
        source: "/user-dashboard",
        destination: "/user-dashboard/my-company",
        permanent: true,
      },
    ];
  },
};
