const express = require("express");
const {
  getNftMetadata
} = require("../controllers/nftsController");

const router = express.Router();


router.get("/metadata/:address/:tokenId", getNftMetadata);

module.exports = router;