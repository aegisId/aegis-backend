import { FastifyInstance } from "fastify";
import verificationController from "./controller/verificationController";
import verifyTwiterpoints from "./controller/twitter";
import userController from "./controller/user";

export default async function router(fastify: FastifyInstance) {
  fastify.register(verificationController, { prefix: "/verify" });
  fastify.register(verifyTwiterpoints, { prefix: "/twitter" });
  fastify.register(userController, { prefix: "/user" });
}
