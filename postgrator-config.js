require("dotenv").config();

module.exports = {
  migrationsDirectory: "migrations",
  driver: "pg",
  //ternary operator to use test db with test command
  connectionString:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_URL
      : process.env.DB_URL,
};
