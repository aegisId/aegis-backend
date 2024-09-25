import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { registerDetails } from "../model/user";
import { UserPostRequest } from "../types";

export async function postUserController(fastify: FastifyInstance) {
  // POST /api/v1/user
  fastify.post(
    "/",
    async function (
      request: FastifyRequest<{ Body: UserPostRequest }>,
      reply: FastifyReply,
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
    },
  );
}

export async function getUserController(fastify: FastifyInstance) {
  fastify.get(
    "/",
    async function (
      request: FastifyRequest<{ Querystring: { address: string } }>,
      reply: FastifyReply,
    ) {
      try {
        const user = await registerDetails.findOne({
          wallet_address: request.query.address,
        });
        if (!user) {
          reply.status(404).send({ message: "User not found" });
          return;
        }
        reply.status(200).send(user);
      } catch (err) {
        reply.status(500).send({ error: "Failed to fetch user", details: err });
      }
    },
  );
}

export async function getAllController(fastify: FastifyInstance) {
  fastify.get(
    "/",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const user = await registerDetails.find();
        if (!user) {
          reply.status(404).send({ message: "No User Available" });
          return;
        }
        reply.status(200).send(user);
      } catch (err) {
        reply.status(500).send({ error: "Failed to fetch user", details: err });
      }
    },
  );
}

export async function updateUser(fastify: FastifyInstance) {
  fastify.post(
    "/",
    async function (
      request: FastifyRequest<{
        Body: UserPostRequest;
      }>,
      reply: FastifyReply,
    ) {
      try {
        if (request.body.wallet_address === undefined) {
          reply.status(400).send({ message: "Wallet address is required" });
          return;
        }
        const updatedUser = await registerDetails.findOneAndUpdate(
          { wallet_address: request.body.wallet_address },
          request.body,
          { new: true },
        );
        if (!updatedUser) {
          reply.status(404).send({ message: "User not found" });
          return;
        }
        reply.status(200).send(updatedUser);
      } catch (err) {
        reply
          .status(500)
          .send({ error: "Failed to update user", details: err });
      }
    },
  );
}

export async function deleteUser(fastify: FastifyInstance) {
  fastify.get(
    "/",
    async function (
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
        reply
          .status(500)
          .send({ error: "Failed to delete user", details: err });
      }
    },
  );
}
