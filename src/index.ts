import winston from "winston";
import "winston-daily-rotate-file";
import app from "./app";
import * as NodeCache from "node-cache";
import mongoose from "mongoose";

const { combine, timestamp, json } = winston.format;

mongoose.set({
  autoCreate: true,
});

mongoose
  .connect("mongodb://127.0.0.1:27017/local", {
    dbName: "local",
  })
  .then(() => {
    logger.info("MongoDB Connected...");
  })
  .catch((error: any) => {
    logger.error("MongoDB connection error: ", error);
  });

//node-cache to cache token list and its USD price from coin-gecko
export const cacheClient = new NodeCache.default({ maxKeys: -1 });

const rotateTransport = new winston.transports.DailyRotateFile({
  filename: "combined.log",
  datePattern: "YYYY-MM-DD-HH",
  json: true,
  maxSize: "20m",
  maxFiles: "5d",
});

rotateTransport.on("error", (error) => {
  logger.info("rotateTransport error: ", error);
});

rotateTransport.on("rotate", (oldFilename, newFilename) => {
  logger.info(``);
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [new winston.transports.Console(), rotateTransport],
});

/**
 * Stores token list and its Coingecko price to cache.
 *
 * @returns {Promise<void>} - A promise that resolves when the token list setting process is complete.
 */

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;
const FASTIFY_HOST = process.env.FASTIFY_HOST || "0.0.0.0";

app.listen({ port: FASTIFY_PORT, host: FASTIFY_HOST });
