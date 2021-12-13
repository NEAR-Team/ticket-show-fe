const { utils } = require("near-api-js");

module.exports = {
  images: {
    domains: ["dummyimage.com", "picsum.photos"],
  },
  reactStrictMode: true,
  env: {
    // CONTRACT_NAME: "saboche.testnet",
    CONTRACT_NAME: "trongtest.testnet",
    domain: "http://localhost:3000",
    CONTRACT_CREATE_FEE: utils.format.parseNearAmount("8.5"),
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
