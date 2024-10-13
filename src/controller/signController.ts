import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import "dotenv/config";
import {
  Aptos,
  AptosConfig,
  Deserializer,
  Ed25519PrivateKey,
  Network,
  NetworkToNetworkName,
  RawTransaction,
} from "@aptos-labs/ts-sdk";

const APTOS_NETWORK: Network = NetworkToNetworkName[Network.TESTNET];

const config = new AptosConfig({
  network: APTOS_NETWORK,
  fullnode: "https://fullnode.testnet.aptoslabs.com/v1",
});
const aptos = new Aptos(config);

export default async function signController(fastify: FastifyInstance) {
  // GET /api/v1/user
  fastify.post(
    "/",
    async function (_request: FastifyRequest, reply: FastifyReply) {
      if (!process.env.AEGIS_ACCOUNT)
        throw new Error("Signing account not found");
      const privateKey = new Ed25519PrivateKey(process.env.AEGIS_ACCOUNT);
      const account = await aptos.deriveAccountFromPrivateKey({
        privateKey: privateKey,
      });
      const incomingData = _request.body as {
        data: Uint8Array;
        additionalSigners?: string[];
      };
      const deserializer = new Deserializer(
        new Uint8Array(Object.values(incomingData.data)),
      );
      const rawTransaction = RawTransaction.deserialize(deserializer);

      let transaction: any = {
        rawTransaction,
        secondarySignerAddresses: [account.accountAddress],
      };
      const aegisSignature = aptos.transaction.sign({
        signer: account,
        transaction,
      });

      const aegisSignatureBytes = aegisSignature.bcsToBytes();

      reply
        .send({
          aegisAuth: aegisSignatureBytes,
          aegisAddress: account.accountAddress.toString(),
          aegisPublicKey: account.publicKey.toString(),
        })
        .status(200);
    },
  );
}
