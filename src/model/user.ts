import mongoose from "mongoose";
import { UserModel } from "../types";

const schema = mongoose.Schema;

const registerSchema = new schema<UserModel>({
  wallet_address: {
    type: String,
    required: true,
    unique: true,
  },
  twitter_username: {
    type: String,
    default: "",
  },
  is_twitter_verified: {
    type: String,
    default: "false",
  },
  discord_username: {
    type: String,
    default: "",
  },
  is_discord_verified: {
    type: String,
    default: "false",
  },
  telegram_username: {
    type: String,
    default: "",
  },
  is_telegram_verified: {
    type: String,
    default: "false",
  },
  wallets_last_sequence_no: {
    type: Number,
    default: 0,
  },
  wallets_last_version_no: {
    type: Number,
    default: 0,
  },
  wallet_score: {
    type: Number,
    default: 0,
  },
  kyc_points: {
    type: Number,
    default: 0,
  },
  biometric_points: {
    type: Number,
    default: 0,
  },
  social_points: {
    type: Number,
    default: 0,
  },
  on_chain_points: {
    type: Number,
    default: 0,
  },
});

// Pre-save middleware to calculate sum
registerSchema.pre("save", function (next) {
  this.wallet_score =
    (this.kyc_points ?? 0) +
    (this.on_chain_points ?? 0) +
    (this.biometric_points ?? 0) +
    (this.social_points ?? 0); // Recalculating sum before saving
  next();
});

// Pre-hook for update operations
registerSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UserModel;

  // If any of the relevant fields are being updated
  if (
    update.kyc_points !== undefined ||
    update.on_chain_points !== undefined ||
    update.biometric_points !== undefined ||
    update.social_points !== undefined
  ) {
    // Retrieve the current document from the database
    const docToUpdate = await this.model.findOne(this.getFilter());

    // Recalculate the wallet score if the document exists
    if (docToUpdate) {
      const newWalletScore =
        (update.kyc_points ?? docToUpdate.kyc_points) +
        (update.on_chain_points ?? docToUpdate.on_chain_points) +
        (update.biometric_points ?? docToUpdate.biometric_points) +
        (update.social_points ?? docToUpdate.social_points);

      // Set the recalculated wallet score
      this.setUpdate({ ...update, wallet_score: newWalletScore });
    }
  }

  next();
});

export const registerDetails = mongoose.model("user", registerSchema, "user");
