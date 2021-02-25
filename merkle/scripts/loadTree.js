const { MerkleTree } = require("../lib/merkleTree");
const fs = require("fs");

const loadTree = (utils, fileName) => {
  const rawdata = fs.readFileSync(fileName);
  const balances = JSON.parse(rawdata);

  let elements = [];
  let balance;
  let leaf;

  Object.keys(balances).forEach(address => {
    // USDC has 6 decimals instead of 18
    balance = utils.toWei(balances[address], "mwei");
    leaf = utils.soliditySha3(address, balance);
    elements.push(leaf);
  });

  return new MerkleTree(elements);
};

module.exports = { loadTree };
