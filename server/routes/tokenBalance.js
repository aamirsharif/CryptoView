const express = require("express");
const { fetchTokenBalance } = require("../controllers/tokenBalanceController");

const router = express.Router();

router.get("/:contractAddress/:walletAddress", fetchTokenBalance);

module.exports = router;

