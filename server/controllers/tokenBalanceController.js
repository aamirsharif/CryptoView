const { Web3 } = require('web3');
const web3 = new Web3(process.env.SEPOLIA_RPC_URL);

const { balanceOfABI } = require("../abi/balanceOf");

const fetchTokenBalance = async (req, res) => {
  try {
    const { contractAddress, walletAddress } = req.params;
    if(!web3.utils.isAddress(contractAddress) || !web3.utils.isAddress(walletAddress)){
      return res.status(400).json({
        error: 'One or both addresses are not valid!'
      })
    }

    const tokenContract = new web3.eth.Contract(balanceOfABI, contractAddress);

    const balance = await tokenContract.methods.balanceOf(walletAddress).call();
    const balanceInEther = web3.utils.fromWei(balance, 'ether');
    console.log("Balance in Ether", balanceInEther);
    
    res.status(200).json({ balance: balanceInEther });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error:
        "Failed to fetch token balance",
    });
  }
};

module.exports = { fetchTokenBalance };


