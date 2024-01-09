import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const factory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x41d2A5c2640EA47e95b0B74Ab009c8fDE44c7490"
);

export default factory;
