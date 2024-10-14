import dotenv from "dotenv";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import { AuthDataValidator, objectToAuthDataMap } from "@telegram-auth/server";
dotenv.config();

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
}

export default async function Telegram(fastify: FastifyInstance) {
  fastify.get(
    "/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Telegram Aegies Id with</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
        </style>
      </head>
      <body>
      <script>
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute("data-telegram-login", "${process.env
          .TELEGRAM_BOT_NAME!}");
        script.setAttribute("data-size", "large");
        script.setAttribute("data-userpic", "false");
        script.setAttribute("data-auth-url", "${process.env.REDIRECT_URI!}");

        document.body.appendChild(script);
      </script>
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </body>
    </html>
    `;

      return reply.type("text/html").send(htmlContent);
    },
  );
  fastify.get<{
    Querystring: Record<string, string>;
  }>(
    "/callback",
    async (
      request: FastifyRequest<{
        Querystring: Record<string, string>;
      }>,
      reply: FastifyReply,
    ) => {
      const validator = new AuthDataValidator({
        botToken: process.env.TELEGRAM_BOT_TOKEN!,
      });
      const data = objectToAuthDataMap(request.query);

      try {
        const user = (await validator.validate(data)) as TelegramUser;
        const userDataString = encodeURIComponent(JSON.stringify(user));
        const redirectUrl = `${process.env.REDIRECT_URI}?user=${userDataString}`;
        reply.redirect(redirectUrl);
      } catch (error) {
        console.error("Error validating Telegram data:", error);
        reply.code(400).send("Invalid Telegram data");
      }
    },
  );
}
