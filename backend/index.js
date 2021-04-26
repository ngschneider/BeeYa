const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const cors = require("cors");

const port = 444;
app.use(cors());

app.use(fileupload({
}));
app.use("/",require("./routes"));

app.listen(port);
