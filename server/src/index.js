const dotenv = require("dotenv");
const express = require("express");
const connectToDB = require("./db");
const error = require("./middlewares/error");

// config file for dotenv
dotenv.config({ path: "./.env" });

// constant definitions
const app = express();
const port = process.env.PORT || 5000;
connectToDB();

// routes
app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/logs", require("./routes/logs"));

// middleware for error
app.use(error);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
