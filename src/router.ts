import { FastifyInstance } from "fastify";
import verificationController from "./controller/verificationController";


export default async function router(fastify: FastifyInstance) {

  fastify.register(verificationController, { prefix: "/verify" });
}
