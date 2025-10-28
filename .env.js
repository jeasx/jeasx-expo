const NODE_ENV_IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export default {
  JEASX_ROUTE_CACHE_LIMIT: 10000,
  FASTIFY_BODY_LIMIT: 4194304,
  FASTIFY_DISABLE_REQUEST_LOGGING: NODE_ENV_IS_DEVELOPMENT,
  FASTIFY_STATIC_HEADERS: NODE_ENV_IS_DEVELOPMENT
    ? { "": { "Cache-Control": "no-store" } }
    : {
        "": { "Cache-Control": "public,max-age=31536000,s-maxage=31536000" },
        "robots.txt": { "Cache-Control": "public,max-age=100,s-maxage=100" },
      },
};
