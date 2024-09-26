import { FastifyRequest, FastifyReply } from "fastify";
import { registerDetails } from "../../model/user";
import { UserModel } from "../../types";
import { getuserDao, getAlluserDao, postUserDao, updateUserDao } from "./dao";

const processUpdateUserModel = (
  recievedData: UserModel,
  exisingData: UserModel,
) => {
  return {
    wallet_address: exisingData.wallet_address,
    twitter_username: recievedData.twitter_username
      ? recievedData.twitter_username
      : exisingData.twitter_username,
    is_twitter_verified: recievedData.is_twitter_verified
      ? recievedData.is_twitter_verified
      : exisingData.is_twitter_verified,
    discord_username: recievedData.discord_username
      ? recievedData.discord_username
      : exisingData.discord_username,
    is_discord_verified: recievedData.is_discord_verified
      ? recievedData.is_discord_verified
      : exisingData.is_discord_verified,
    telegram_username: recievedData.telegram_username
      ? recievedData.telegram_username
      : recievedData.telegram_username,
    is_telegram_verified: recievedData.is_telegram_verified
      ? recievedData.is_telegram_verified
      : exisingData.is_telegram_verified,
    wallets_last_sequence_no: recievedData.wallets_last_sequence_no
      ? recievedData.wallets_last_sequence_no
      : exisingData.wallets_last_sequence_no,
    wallets_last_version_no: recievedData.wallets_last_version_no
      ? recievedData.wallets_last_version_no
      : exisingData.wallets_last_version_no,
    // wallet_score: recievedData.wallet_score ? recievedData.wallet_score : exisingData.wallet_score,
    kyc_points: recievedData.kyc_points
      ? recievedData.kyc_points
      : exisingData.kyc_points,
    biometric_points: recievedData.biometric_points
      ? recievedData.biometric_points
      : exisingData.biometric_points,
    social_points: recievedData.social_points
      ? recievedData.social_points
      : exisingData.social_points,
    on_chain_points: recievedData.on_chain_points
      ? recievedData.on_chain_points
      : exisingData.on_chain_points,
  } as UserModel;
};

export async function postUser(
  request: FastifyRequest<{ Body: UserModel }>,
  reply: FastifyReply,
) {
  const req = request.body;
  try {
    const res = await postUserDao(req);
    if (!res) {
      reply.status(400).send({ message: "Failed to save user data" });
      return;
    }
    reply.status(200).send({ message: "User data saved successfully" });
  } catch (err) {
    reply.status(500).send({ error: "Failed to save user data", details: err });
  }
}

export async function getUser(
  request: FastifyRequest<{ Querystring: { address: string } }>,
  reply: FastifyReply,
) {
  try {
    if (request.query.address === undefined) {
      reply.status(400).send({ message: "Wallet address is required" });
      return;
    }
    const user = await getuserDao(request.query.address);
    if (!user) {
      reply.status(404).send({ message: "User not found" });
      return;
    }
    reply.status(200).send(user);
  } catch (err) {
    reply.status(500).send({ error: "Failed to fetch user", details: err });
  }
}

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = await getAlluserDao();
    if (!user) {
      reply.status(404).send({ message: "No User Available" });
      return;
    }
    reply.status(200).send(user);
  } catch (err) {
    reply.status(500).send({ error: "Failed to fetch user", details: err });
  }
}

export async function updateUser(
  request: FastifyRequest<{
    Body: UserModel;
  }>,
  reply: FastifyReply,
) {
  try {
    if (request.body.wallet_address === undefined) {
      reply.status(400).send({ message: "Wallet address is required" });
      return;
    }
    const user = await getuserDao(request.body.wallet_address);
    if (!user) {
      reply.status(404).send({ message: "User not found" });
      return;
    }
    const updatedUser = await updateUserDao(
      processUpdateUserModel(request.body, user),
    );
    if (!updatedUser) {
      reply.status(404).send({ message: "User not found" });
      return;
    }
    reply.status(200).send(updatedUser);
  } catch (err) {
    reply.status(500).send({ error: "Failed to update user", details: err });
  }
}

export async function deleteUser(
  request: FastifyRequest<{ Querystring: { address: string } }>,
  reply: FastifyReply,
) {
  try {
    const deletedUser = await registerDetails.findOneAndDelete({
      wallet_address: request.query.address,
    });
    if (!deletedUser) {
      reply.status(404).send({ message: "User not found" });
      return;
    }
    reply.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    reply.status(500).send({ error: "Failed to delete user", details: err });
  }
}

export async function getWalletScore(
  request: FastifyRequest<{ Querystring: { address: string } }>,
  reply: FastifyReply,
) {
  try {
    const user = await getuserDao(request.query.address);
    if (user) {
      reply.status(200).send(user.wallet_score);
    } else {
      reply.status(404).send({ message: "User not found" });
      return;
    }
  } catch (err) {
    reply.status(500).send({ error: "Failed to fetch user", details: err });
  }
}
export async function isWalletExist(
  request: FastifyRequest<{ Querystring: { address: string } }>,
  reply: FastifyReply,
) {
  try {
    const user = await getuserDao(request.query.address);
    if (user) {
      reply.status(200).send({ exists: true });
    } else {
      reply.status(200).send({ exists: false });
    }
  } catch (err) {
    reply.status(500).send({ error: "Failed to fetch user", details: err });
  }
}

export async function onChainScore(
  request: FastifyRequest<{ Querystring: { address: string } }>,
  reply: FastifyReply,
) {
  try {
    const user = await getuserDao(request.query.address);
    if (user) {
      reply.status(200).send(user.on_chain_points);
    } else {
      reply.status(404).send({ message: "User not found" });
      return;
    }
  } catch (err) {
    reply.status(500).send({ error: "Failed to fetch user", details: err });
  }
}

export async function isSocialVerified(
  request: FastifyRequest<{ Querystring: { address: string } }>,
  reply: FastifyReply,
) {
  const user = await getuserDao(request.query.address);
  if (user) {
    reply.status(200).send({
      twitter: user.is_twitter_verified,
      telegram: user.is_telegram_verified,
      discord: user.is_discord_verified,
    });
  } else {
    reply.status(200).send("user not found");
  }
}
