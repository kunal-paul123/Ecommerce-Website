const app = require("./app");
const dotenv = require("dotenv");
const database = require("./config/database");

//handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");

  process.exit(1);
});

//config
dotenv.config({ path: "Backend/config/config.env" });

//connecting to database
database();

//start the server
const PORT = process.env.PORT || 5000;

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//unhaldled promise rejaction
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhaldled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
