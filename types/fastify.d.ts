import 'fastify';
import '@fastify/session';
import { MySQLPool } from "@fastify/mysql";

declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQLPool;
  }
}

declare module '@fastify/session' {
  interface FastifySessionObject {
    oauth_token?: string;
    oauth_token_secret?: string;
    access_token?: string;
    access_secret?: string;
    loggedClient?: any;
  }
}