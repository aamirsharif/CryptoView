const express = require("express");
const { fetchRecentTransactions , fetchTransactionsByDateRange } = require("../controllers/cryptoTransactionsController");

const router = express.Router();

router.get("/:address", fetchRecentTransactions);
router.get("/:address/:startTimeStamp/:endTimeStamp", fetchTransactionsByDateRange);

module.exports = router;

