require("dotenv").config({ path: "./config.env" });

const database_uri = process.env.MONGODB_URI;
const jwt_secret = process.env.JWT_SECRET;

module.exports = {
  database_uri,
  jwt_secret
};