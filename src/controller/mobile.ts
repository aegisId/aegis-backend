import dotenv from "dotenv";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { Twilio } from "twilio";
dotenv.config();

const twilio_sid = process.env.TWILIO_SID! || "";
const twlio_auth = process.env.TWILIO_AUTH! || "";
const service_id = process.env.TWILIO_SERVICE_ID! || "";
const client = new Twilio(twilio_sid, twlio_auth);
export default async function Mobile(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: { phoneNumber: string };
  }>(
    "/send",
    async (
      request: FastifyRequest<{
        Querystring: { phoneNumber: string };
      }>,
      reply: FastifyReply,
    ) => {
      const { phoneNumber } = request.query;
      const formattedMobileNumber = `+91${phoneNumber}`;
      try {
        const verification = await client.verify.v2
          .services(service_id)
          .verifications.create({ to: formattedMobileNumber, channel: "sms" });
        reply.send({ success: true, status: verification.status });
      } catch (error) {
        console.error("Error sending OTP:", error);
        reply.code(500).send({ success: false, error: "Error sending OTP" });
      }
    },
  );
  fastify.get<{
    Querystring: { phoneNumber: string; otp: string };
  }>(
    "/verify",
    async (
      request: FastifyRequest<{
        Querystring: { phoneNumber: string; otp: string };
      }>,
      reply: FastifyReply,
    ) => {
      const { phoneNumber, otp } = request.query;
      const formattedMobileNumber = `+91${phoneNumber}`;
      try {
        const verificationCheck = await client.verify.v2
          .services(service_id)
          .verificationChecks.create({ to: formattedMobileNumber, code: otp });
        if (verificationCheck.status === "approved") {
          reply.send({ success: true, message: "OTP verified" });
        } else {
          reply.send({ success: false, message: "OTP verification failed" });
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        reply.code(500).send({ success: false, error: "Error verifying OTP" });
      }
    },
  );
}
