import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv"
import { FastifyInstance } from "fastify/types/instance";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
dotenv.config()

export default async function addTwiterpoints(fastify: FastifyInstance) {
    fastify.post(
        "/authlink",
        async function (
            request: FastifyRequest<any>,
            reply: FastifyReply
        ) {
            let authlink: any;
            try {
                const CONSUMER_KEY='a2JKTkhHQk5wLUJkQWlPRkVFNjM6MTpjaQ';
                const CONSUMER_SECRET='XQE8pFntlhxfZ1gXbLMiOp1kIMaJEnFBb5DpUMiiu2H-PrelU4'
                const GENERATE_LINK='https://www.aegisid.io/auth-return'
                const client = new TwitterApi({ appKey: CONSUMER_KEY, appSecret:CONSUMER_SECRET });
                authlink = await client.generateAuthLink(GENERATE_LINK);
            }
            catch (error) {
                const errorresponse = {
                    status: 400,
                    message: "something went wrong",
                    error: error
                }
                reply.code(400).send(errorresponse)
            }
            const { url, oauth_token, oauth_token_secret } = authlink;
            request.session.oauth_token = oauth_token;
            request.session.oauth_token_secret = oauth_token_secret;

            const response = {
                status: 200,
                authlink: url
            }
            reply.code(200).send(response)
        })

    // fastify.post(
    //     "/connect",
    //     async function (
    //         request: FastifyRequest<{
    //             Body: {
    //                 oauth_token: string,
    //                 oauth_verifier: string
    //             }
    //         }>,
    //         reply: FastifyReply
    //     ) {
    //         let client: any;

    //         const {
    //             oauth_token,
    //             oauth_verifier
    //         } = request.body;

    //         try {
    //             client = new TwitterApi({
    //                 appKey: process.env.CONSUMER_KEY || "",
    //                 appSecret: process.env.CONSUMER_SECRET || "",
    //                 accessToken: oauth_token,
    //                 accessSecret: request.session.oauth_token_secret
    //             });
    //         }
    //         catch (error) {
    //             const errorresponse = {
    //                 status: 400,
    //                 message: "something went wrong"
    //             }
    //             reply.code(400).send(errorresponse)
    //         }
    //         try {
    //             const { client: loggedClient, accessToken, accessSecret }: {
    //                 client: any,
    //                 accessToken: string,
    //                 accessSecret: string
    //             } = await client.login(oauth_verifier);

    //             request.session.access_token = accessToken;
    //             request.session.access_secret = accessSecret;
    //             request.session.loggedClient = loggedClient;
    //             const success = {
    //                 status: 200,
    //                 client: loggedClient,
    //                 message: "sucessssssss"
    //             }
    //             reply.code(200).send(success)
    //         } catch (e) {
    //             reply.code(400).send({ message: "Client login failed!" });
    //         }


    //     }
    // )

}

