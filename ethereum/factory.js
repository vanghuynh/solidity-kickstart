import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const factory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x152A61cfa8b688bb93E0f89c816E5F44ffEeA7f2"
);

export default factory;
