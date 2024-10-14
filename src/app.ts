import fastify from "fastify";
import router from "./router";
import cors from "@fastify/cors";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
const server = fastify({
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development"),
});

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Custom-Header"],
  credentials: false,
  maxAge: 86400,
});
// Health check route
server.get("/health", async () => {
  return { status: "ok", timestamp: new Date() };
});
// Middleware: Router
server.register(router);
server.register(fastifyCookie);
server.register(fastifySession, {
  secret: "a secret with minimum length of 32 characters",
  cookie: { secure: false },
});

export default server;
