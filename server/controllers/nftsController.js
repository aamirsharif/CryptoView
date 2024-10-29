const dotenv = require("dotenv");
dotenv.config();
const { Web3 } = require('web3');
const NftsSchema = require('../models/nftsModel');

const web3 = new Web3(process.env.SEPOLIA_RPC_URL);
const {tokenURIABI} = require('../abi/tokenURI');

const getNftMetadata = async (req, res) => {
  try {
    const {address, tokenId} = req.params;
    if(!web3.utils.isAddress(address)){
      return res.status(400).json({
        error: 'Contract address is not a valid address!'
      })
    }

    const contract = new web3.eth.Contract(tokenURIABI, address)
    const result = await contract.methods.tokenURI(tokenId).call()

    const metadata = await fetch(result);
    const json = await metadata.json();
    const existingNft = await NftsSchema.findOneAndUpdate(
      { contractAddress: address, tokenId },
      { metadata: json },
      { upsert: true, new: true }
    );
    res.status(200).json(existingNft);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error:
        "Failed to retrieve nft metadata",
    });
  }
};

module.exports = { getNftMetadata };