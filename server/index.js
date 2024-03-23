import Fastify from "fastify";
import AuthRoute from "./routes/auth.js";
import UserRoute from "./routes/user.js";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import connectDB from "./db/db.js";
import { jwtverify } from "./hook/jwtverify.js";

dotenv.config();
const fastify = Fastify({
  logger: true,
});

fastify.register(helmet, { contentSecurityPolicy: false });

fastify.register(cors, {
  origin: "process.env.CLIENT_URL",
  methods: "GET,PUT,POST,DELETE",
});

fastify.addHook("onRequest", jwtverify);

fastify.register(AuthRoute);
fastify.register(UserRoute);

const start = async () => {
  try {
    await connectDB();
    console.log("Database connected");
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
