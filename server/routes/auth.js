import { register, login } from "../controller/auth.js";

async function routes(fastify, options) {
  fastify.post("/login", login);
  fastify.post("/register", register);
}

export default routes;
