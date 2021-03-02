// Usage example:
// npm run disburse -- /home/greg/erc20-redeemable/merkle/test/10_totals.json 10622281 1 1000 --network kovan

const tokenAddress = "0xd0a13cf08751b0c5a66e6c85d811ef5d83747360";

const MerkleRedeem = artifacts.require("MerkleRedeem.sol");
const Token = artifacts.require("TToken.sol");

const { utils } = web3;
const { loadTree } = require("./loadTree");

module.exports = async function(callback) {
  console.log("File Path Arg (must be absolute):", process.argv[4]);

  const merkleTree = loadTree(utils, process.argv[4]);
  const blockNum = process.argv[5];
  const weekNum = process.argv[6];

  const block = await web3.eth.getBlock(blockNum);
  const approveAmount = parseInt(process.argv[7]);
  console.log("Block:\t", blockNum, block.hash, block.timestamp);

  const root = merkleTree.getHexRoot();
  console.log("Tree root:\t", root);

  const token = await Token.at(tokenAddress);
  const redeem = await MerkleRedeem.deployed();

  const allocationAmount = (approveAmount * 1e6).toString();

  await token.approve(redeem.address, allocationAmount);
  console.log(`Approve USDC done`);

  await redeem.seedAllocations(weekNum, root, allocationAmount);
  console.log("seedAllocations done");

  callback();
};
