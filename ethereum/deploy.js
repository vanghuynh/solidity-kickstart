const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

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

  console.log("Attempting to deploy from account", defaultAccount);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: defaultAccount });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
