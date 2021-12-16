const { utils } = require("near-api-js");

module.exports = {
  images: {
    domains: ["dummyimage.com", "picsum.photos", "storage.googleapis.com"],
  },
  reactStrictMode: true,
  env: {
    // CONTRACT_NAME: "saboche.testnet",
    CONTRACT_NAME: "b-ticket1.testnet",
    domain: "http://localhost:3000",
    CONTRACT_CREATE_FEE: utils.format.parseNearAmount("8.5"),
    TICKET_PREPARE_GAS: utils.format.parseNearAmount("0.1"),
    jsonRpcProvider: "https://rpc.testnet.near.org",
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/user-dashboard",
  //       destination: "/user-dashboard/my-show",
  //       permanent: true,
  //     },
  //   ];
  // },
};
