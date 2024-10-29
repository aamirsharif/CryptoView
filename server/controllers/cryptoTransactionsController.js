const dotenv = require("dotenv");
dotenv.config();
const { Web3 } = require('web3');
const web3 = new Web3(process.env.SEPOLIA_RPC_URL);
const CryptoTransactionsSchema = require("../models/cryptoTransactionsModel");

const fetchRecentTransactions = async (req, res) => {
  try {
    const { address } = req.params;
    if(!web3.utils.isAddress(address)){
      return res.status(400).json({
        error: 'Blockchain address is not a valid address!'
      })
    }

    const apiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=10&sort=desc&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    
    const transactions = data.result.slice(0, 5); // Fetching the latest 5 transactions
    // Store the transactions in MongoDB
    await CryptoTransactionsSchema.bulkWrite(transactions.map(transaction => ({
      updateOne: {
        filter: { hash: transaction.hash },
        update: { $set: transaction },
        upsert: true,
        new: true,
      },
    })));

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error:
        "Failed to fetch recent transactions",
    });
  }
};

const fetchTransactionsByDateRange = async (req, res) => {
  try {
    const { address, startTimeStamp, endTimeStamp } = req.params;
    if(!web3.utils.isAddress(address)){
      return res.status(400).json({
        error: 'Blockchain address is not a valid address!'
      })
    }
    const serializedAddress = address.toLowerCase()

    const transactions = await CryptoTransactionsSchema.find({
      $or: [
        { from: serializedAddress },
        { to: serializedAddress }
      ],
      timeStamp: {
        $gte: startTimeStamp,
        $lte: endTimeStamp
      }
    });

    if(transactions.length === 0) {
      return res.status(404).json({
        error: 'No transactions found for the given date range.'
      });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error:
        "Failed to fetch transactions by date range",
    });
  }
};

module.exports = { fetchRecentTransactions, fetchTransactionsByDateRange };