const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

let factory;

const factoryAddress = "0xaC461655B35681de9BB7dE8e1e7deaFF490c4D4d";

const provider = new HDWalletProvider(
  //"REPLACE_WITH_YOUR_MNEMONIC",
  "xxx",
  // remember to change this to your own phrase!
  "https://goerli.infura.io/v3/xxx"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const defaultAccount = accounts[0];

  factory = new web3.eth.Contract(compiledFactory.abi, factoryAddress);

  console.log("Attempting to deploy from account", defaultAccount);
  console.log("factory:", factory);
  console.log("factoryMethod:", factory.methods);
  await factory.methods.createCampaign("100").send({
    from: defaultAccount,
    gas: "1400000",
  });
  campaignAddresses = await factory.methods.getDeployedCampaigns().call();

  console.log("campaignAddresses deployed: ", campaignAddresses[0]);
  provider.engine.stop();
};
deploy();
