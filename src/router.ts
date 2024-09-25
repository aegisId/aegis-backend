import { FastifyInstance } from "fastify";
import verificationController from "./controller/verificationController";
import verifyTwiterpoints from "./controller/twitter";
import {
  postUserController,
  getUserController,
  updateUser,
  deleteUser,
  getAllController,
} from "./controller/userController";

export default async function router(fastify: FastifyInstance) {
  fastify.register(verificationController, { prefix: "/verify" });
  fastify.register(verifyTwiterpoints, { prefix: "/twitter" });
  fastify.register(postUserController, { prefix: "/postUser" });
  fastify.register(getUserController, { prefix: "/getUser" });
  fastify.register(getAllController, { prefix: "/users" });
  fastify.register(updateUser, { prefix: "/updateUser" });
  fastify.register(deleteUser, { prefix: "/deleteUser" });
}
