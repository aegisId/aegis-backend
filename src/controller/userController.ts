import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { registerDetails } from "../model/user";

// Define the expected shape of the request body
interface RegisterDetailsRequest {
  username: string;
  email: string;
}

export default async function postUserController(fastify: FastifyInstance) {
  // POST /api/v1/user
  fastify.post(
    "/",
    async function (
      request: FastifyRequest<{ Body: RegisterDetailsRequest }>,
      reply: FastifyReply
    ) {
      const req = request.body;

      try {
        let data = new registerDetails(req);
        await data.save();
        reply.status(200).send({ message: "User data saved successfully" });
      } catch (err) {
        reply
          .status(500)
          .send({ error: "Failed to save user data", details: err });
      }
    }
  );
}
