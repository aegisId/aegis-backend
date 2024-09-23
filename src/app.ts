import fastify from "fastify";
import router from "./router";
import cors from "@fastify/cors";

const server = fastify({
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development"),
});

server.register(cors, {
  origin: true, // Allowed origin (your localhost)
  methods: ["GET", "POST"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type"], // Allowed headers in the request
  exposedHeaders: ["Custom-Header"], // Headers to expose in the response
  credentials: true, // Allow cookies and HTTP authentication headers
  maxAge: 86400,
});
// Middleware: Router
server.register(router);

export default server;
