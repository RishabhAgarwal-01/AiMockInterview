/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://aimockinterview_owner:QKAESXWva65s@ep-crimson-river-a1oxi0sx.ap-southeast-1.aws.neon.tech/aimockinterview?sslmode=require',
    }
  };