const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

let factory;

const factoryAddress = "0x41d2A5c2640EA47e95b0B74Ab009c8fDE44c7490";

const provider = new HDWalletProvider(
  //"REPLACE_WITH_YOUR_MNEMONIC",
  "xxx xxx",
  // remember to change this to your own phrase!
  "https://goerli.infura.io/v3/xxx"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const defaultAccount = accounts[0];

  factory = new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
    factoryAddress
  );

  console.log("Attempting to deploy from account", defaultAccount);
  console.log("factory:", factory);
  console.log("factoryMethod:", factory.methods);
  await factory.methods.createCampaign("100").send({
    from: defaultAccount,
    gas: "3000000",
    //gasPrice: "2000000",
    //maxFeePerGas: "5000000",
    //maxPriorityFeePerGas: "3000000",
  });
  campaignAddresses = await factory.methods.getDeployedCampaigns().call();

  console.log("campaignAddresses deployed: ", campaignAddresses);
  provider.engine.stop();
};
deploy();
