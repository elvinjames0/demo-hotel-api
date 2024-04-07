const express = require("express");
const app = express();
const cors = require("cors");
const rootRouter = require("./routes");
const { decodeToken } = require("./middlewares/auth");
require("dotenv").config();

let PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static("."));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-deployed-site.com"],
  })
);

app.use(rootRouter);

app.listen(PORT, () => console.log(`SERVER running at port ${PORT}`));
