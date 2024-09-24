import { FastifyInstance } from "fastify";
import verificationController from "./controller/verificationController";
import postUserController from "./controller/userController";

export default async function router(fastify: FastifyInstance) {

  fastify.register(verificationController, { prefix: "/verify" });
  fastify.register(postUserController, { prefix: "/postUser" });

}
