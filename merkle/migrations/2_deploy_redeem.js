const TToken = artifacts.require("./TToken.sol");
const Redeem = artifacts.require("./MerkleRedeem.sol");

module.exports = (deployer, network, accounts) => {
  const admin = accounts[1]; //
  console.log(`admin address admin`, admin);
  deployer.then(async () => {
    // await deployer.deploy(TToken, "Test USDC", "opyn USDC", 6);
    // const token = await TToken.deployed();

    // await token.mint(admin, "10000000000"); // 10000 USDC

    // mainnet usdc address
    const usdcAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

    await deployer.deploy(Redeem, usdcAddress, { from: admin });
  });
};
