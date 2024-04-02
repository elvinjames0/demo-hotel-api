const express = require("express");
const app = express();
const cors = require("cors");
const rootRouter = require("./routes");
require("dotenv").config();

let PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));
app.use(cors());

app.use(rootRouter);

app.listen(PORT, () => console.log(`SERVER running at port ${PORT}`));
