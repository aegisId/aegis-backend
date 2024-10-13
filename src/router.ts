import { FastifyInstance } from "fastify";
import verificationController from "./controller/verificationController";
import verifyTwiter from "./controller/twitter";
import userController from "./controller/user";
import signController from "./controller/signController";
import verifyTelagram from "./controller/telegram";

export default async function router(fastify: FastifyInstance) {
  fastify.register(verificationController, { prefix: "/verify" });
  fastify.register(verifyTwiter, { prefix: "/twitter" });
  fastify.register(verifyTelagram, { prefix: "/telegram" });
  fastify.register(userController, { prefix: "/user" });
  fastify.register(signController, { prefix: "/sign" });
}
