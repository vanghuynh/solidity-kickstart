const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

let factory;

const factoryAddress = "0xe2321d75e0Ec448368dDFc0745533C14c288Cd8E";

const provider = new HDWalletProvider(
  //"REPLACE_WITH_YOUR_MNEMONIC",
  "",
  // remember to change this to your own phrase!
  //"https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c"
  ""
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const defaultAccount = accounts[1];

  factory = new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
    factoryAddress
  );

  console.log("Attempting to deploy from account", defaultAccount);
  console.log("factory:", factory);
  console.log("factoryMethod:", factory.methods);
  await factory.methods.createCampaign("0").send({
    from: defaultAccount,
    gas: "10000000",
    //maxFeePerGas: "5000000",
    //maxPriorityFeePerGas: "3000000",
  });
  campaignAddresses = await factory.methods.getDeployedCampaigns().call();

  console.log("campaignAddresses deployed: ", campaignAddresses);
  provider.engine.stop();
};
deploy();
