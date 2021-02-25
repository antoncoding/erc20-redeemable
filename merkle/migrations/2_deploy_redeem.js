const TToken = artifacts.require("./TToken.sol");
const Redeem = artifacts.require("./MerkleRedeem.sol");
const { utils } = web3;

module.exports = (deployer, network, accounts) => {
  const admin = accounts[0]; //
  deployer.then(async () => {
    await deployer.deploy(TToken, "Test USDC", "opyn USDC", 6);
    const token = await TToken.deployed();
    console.log(`admin`, admin);
    await token.mint(admin, "10000000000"); // 10000 USDC

    await deployer.deploy(Redeem, token.address);
    const redeem = await Redeem.deployed();

    await token.transfer(redeem.address, "200000000", { from: admin });
  });
};
