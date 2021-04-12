// Usage example:
// npm run disburse -- /home/greg/erc20-redeemable/merkle/test/10_totals.json 10622281 1 1000 --network kovan

// kovan
// const tokenAddress = "0xb8accc037ea179bfcd403d92fafcb2c467c434c6";
// const redeemAddress = "0xA9097F6d431C215bb17EB1Dba234aE34e8b6FC5b";

// mainnet
const tokenAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const redeemAddress = "0x72b61866760f05e9443317911e60a5c739e7472f";

const MerkleRedeem = artifacts.require("MerkleRedeem.sol");
const Token = artifacts.require("TToken.sol");

const { utils } = web3;
const { loadTree } = require("./loadTree");

module.exports = async function(callback, address) {
  try {
    console.log(`address`, address);
    console.log("File Path Arg (must be absolute):", process.argv[4]);

    const merkleTree = loadTree(utils, process.argv[4]);
    const weekNum = process.argv[5];

    const approveAmount = parseInt(process.argv[6]);

    const root = merkleTree.getHexRoot();
    console.log("Tree root:\t", root);

    const redeem = await MerkleRedeem.at(redeemAddress);
    console.log(`Redeem contract deployed`);

    const allocationAmount = (approveAmount * 1e6).toString();

    // await token.approve(redeem.address, allocationAmount);
    // console.log(`Approve USDC done`);
    console.log(`weekNum`, weekNum);
    console.log(`allocationAmount`, allocationAmount);
    console.log(`waiting now...`);
    await redeem.seedAllocations(weekNum, root, allocationAmount);
    console.log("seedAllocations done");

    callback();
  } catch (error) {
    callback(error);
  }
};
