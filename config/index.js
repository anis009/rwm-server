import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
  mongo_uri:
    process.env.NODE_ENV === "development"
      ? process.env["MONGO_DEV_URI"]
      : process.env["MONGO_PROD_URI"],
};
