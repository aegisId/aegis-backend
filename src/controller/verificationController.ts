import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import * as snarkjs from 'snarkjs';
import 'dotenv/config';
export default async function verificationController(fastify: FastifyInstance) {
  // GET /api/v1/user
  fastify.get(
    "/",
    async function (_request: FastifyRequest, reply: FastifyReply) {
        if (!process.env.verficationKey) throw new Error('verification key not found');
        if (!_request.query) throw new Error('missing params');
        const { proof, publicSignals } = _request.query as any;
        if (!proof) throw new Error('missing proof');
        if (!publicSignals) throw new Error('missing public signals');
        const decodedKey = Buffer.from(process.env.verficationKey, 'base64').toString('utf-8');
        const vKey = JSON.parse(decodedKey);
        const decodedProof = Buffer.from(proof, 'base64').toString('utf-8');
        const jsonProof = JSON.parse(decodedProof);
        const decodedProofSignals = Buffer.from(publicSignals, 'base64').toString('utf-8');
        const jsonProofSignals = JSON.parse(decodedProofSignals);
    
        const res = await snarkjs.groth16.verify(
          vKey,
          jsonProofSignals as snarkjs.PublicSignals,
          jsonProof as snarkjs.Groth16Proof
        );

      reply.send(res);
    },
  );
}
