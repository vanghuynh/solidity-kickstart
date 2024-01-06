import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const factory = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xe2321d75e0Ec448368dDFc0745533C14c288Cd8E"
);

export default factory;
