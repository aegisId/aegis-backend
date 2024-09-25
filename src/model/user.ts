import mongoose from "mongoose";

const schema = mongoose.Schema;

const registerSchema = new schema({
  wallet_address: {
    type: String,
  },
  twitter_username: {
    type: String,
  },
  is_Verified: {
    type: Boolean,
  },
  wallets_last_sequence_no: {
    type: Number,
  },
  wallets_last_version_no: {
    type: Number,
  },
  wallet_score: {
    type: Number,
  },
  kyc_points: {
    type: Number,
  },
  biometric_points: {
    type: Number,
  },
  social_points: {
    type: Number,
  },
  on_chain_points: {
    type: Number,
  },
});

export const registerDetails = mongoose.model("user", registerSchema, "user");
