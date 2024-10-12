import { FastifyInstance } from "fastify";
import {
  postUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getWalletScore,
  isWalletExist,
  onChainScore,
  isSocialVerified,
  verifyKycFromBinance,
  isKycVerified,
} from "./services";
export default async function userController(fastify: FastifyInstance) {
  fastify.post("/post", postUser);
  fastify.get("/get", getUser);
  fastify.post("/update", updateUser);
  fastify.get("/delete", deleteUser);
  fastify.get("/all", getAllUsers);
  fastify.get("/getScore", getWalletScore);
  fastify.get("/isExist", isWalletExist);
  fastify.get("/onChainScore", onChainScore);
  fastify.get("/isSocialVerified", isSocialVerified);
  fastify.get("/verifyKycFromBinance", verifyKycFromBinance);
  fastify.get("/isKycVerified", isKycVerified);
}
