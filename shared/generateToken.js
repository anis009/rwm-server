import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const generateToken = (payload) => {
  // Calculate the expiration date
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 2);
  // Generate the JWT token
  const token = jwt.sign(payload, config.jwt_secret, {
    expiresIn: Math.floor(expirationDate.getTime() / 1000), // Token expires in 1 day
  });

  return token;
};
