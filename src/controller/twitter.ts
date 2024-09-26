import dotenv from "dotenv";
import { FastifyInstance } from "fastify/types/instance";
import axios from "axios";
import crypto from 'crypto'
dotenv.config();

interface CallbackQuery {
  code?: string
  state?: string
}

export default async function addTwiterpoints(fastify: FastifyInstance) {

  fastify.get<{ Querystring: CallbackQuery, Reply: { userId?: string; error?: string } }>(
    '/callback',
    async (request, reply) => {
      const { code, state } = request.query;
      if (!code) {
        return reply.code(400).send({ error: 'Missing code parameter' });
      }

      try {
        const tokenResponse = await axios.post(
          'https://api.twitter.com/2/oauth2/token',
          new URLSearchParams({
            code,
            grant_type: 'authorization_code',
            client_id: process.env.TWITTER_CLIENT_ID!, 
            redirect_uri: process.env.REDIRECT_URI!,
            code_verifier: 'challenge'
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64')}`
            }
          }
        );

        const { access_token } = tokenResponse.data;

        const userResponse = await axios.get('https://api.twitter.com/2/users/me', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        const userId = userResponse.data.data.id;
        return reply.send({ userId });
      } catch (error) {
        console.error(error);
        return reply.code(500).send({ error: 'An error occurred during authentication' });
      }
    }
  );

  fastify.get<{ Reply: { url: string } }>(
    '/auth',
    async (request, reply) => {
      const state = crypto.randomBytes(16).toString('hex');
      const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.TWITTER_CLIENT_ID!}&redirect_uri=${process.env.REDIRECT_URI!}&scope=tweet.read%20users.read&state=${state}&code_challenge=challenge&code_challenge_method=plain`;
      return reply.send({ url: authUrl });
    }
  );
}


