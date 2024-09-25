import { FastifyInstance } from "fastify";
import verificationController from "./controller/verificationController";
import verifyTwiterpoints from "./controller/twitter";

export default async function router(fastify: FastifyInstance) {
  fastify.register(verificationController, { prefix: "/verify" });
  fastify.register(verifyTwiterpoints, { prefix: "/twitter" });
}
