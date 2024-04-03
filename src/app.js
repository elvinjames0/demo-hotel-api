const express = require("express");
const app = express();
const cors = require("cors");
const rootRouter = require("./routes");
const { decodeToken } = require("./middlewares/auth");
require("dotenv").config();

let PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));
app.use(cors());

app.use(rootRouter);

app.listen(PORT, () => console.log(`SERVER running at port ${PORT}`));
let info = decodeToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6Imh1eXRoYW5obWFuYWdlciJ9LCJpYXQiOjE3MTIxMjMzMDcsImV4cCI6MTcxMjE2NjUwN30.dvaStGh4E6MpDBsY5ofdprCzcwX7ZkNwa1Yn_zOvXzE"
);
console.log("info: ", info);
