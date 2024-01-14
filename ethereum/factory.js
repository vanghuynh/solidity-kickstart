import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xaC461655B35681de9BB7dE8e1e7deaFF490c4D4d"
);

export default instance;
