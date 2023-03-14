const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectToDB = require("./db");
const error = require("./middlewares/error");
const cookieParser = require("cookie-parser");

// config file for dotenv
dotenv.config({ path: "./.env" });

// constant definitions
const app = express();
const port = process.env.PORT || 5000;
connectToDB();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/logs", require("./routes/logsRoutes"));
app.use("/api/v1/community", require("./routes/communityRoutes.js"));

// middleware for error
app.use(error);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

/*
Procedure while testing the backend
Create admin account
Create user account

// logs
Create logs from user account
Check crud on logs

// communities
create community from a user account
check crud on community
make another user
join the community created by the prev user
add comments and check crud on comments

// admin
delete other users and/or commuities etc
*/
