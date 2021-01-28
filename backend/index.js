const express = require("express");
const app = express();

const cors = require("cors");

const port = 444;


app.use(cors());

app.use("/",require("./routes"));

app.listen(port);
