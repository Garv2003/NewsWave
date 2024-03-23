async function routes(fastify, options) {
  fastify.get("/post", async (request, reply) => {
    return { hello: "world" };
  });
}

export default routes;
