const mongoose = require("mongoose");
const { Schema } = mongoose;

const NftsSchema = new Schema({
  contractAddress: {
    type: String,
    required: true,
  },
  tokenId: {
    type: String,
    required: true,
  },
  metadata: {
    type: Schema.Types.Map,
    required: true,
  }
}, { timestamps: true });

NftsSchema.index({contractAddress: 1, tokenId: 1}, {unique: true});

module.exports = mongoose.model("Nfts", NftsSchema);