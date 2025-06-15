const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/router");
const cookieParser = require('cookie-parser');
require("dotenv").config();

/* Static variables for configurations. */

const PORT = process.env.PORT || 5500;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Server has been connected to the MongoDB successfully."))
  .catch((err) => console.error("There is an error occured while connectin to the MongoDB:\n", err));

const app = express();
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));


app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000","http://127.0.0.1:3000","http://localhost:3001","http://127.0.0.1:3001","http://localhost:3002","http://127.0.0.1:3002","http://localhost:3003","http://127.0.0.1:3003"],
    credentials: true
  })
)
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}.`);
  });