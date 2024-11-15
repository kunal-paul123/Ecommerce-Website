const app = require("./app");
const dotenv = require("dotenv");
const database = require("./config/database");

//config
dotenv.config({ path: "Backend/config/config.env" });

//connecting to database
database();

//start the server
const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
