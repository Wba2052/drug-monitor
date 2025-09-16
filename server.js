const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectMongo = require("./server/database/connect");

dotenv.config(); // Load biến môi trường từ .env

const app = express();
const PORT = process.env.PORT || 3100;

// ------------------ MIDDLEWARE ------------------
app.set("view engine", "ejs");

// Parse body request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS, images...)
app.use(express.static("assets"));

// Log HTTP requests
app.use(morgan("tiny"));

// ------------------ DATABASE ------------------
connectMongo();

// ------------------ ROUTES ------------------
app.use("/", require("./server/routes/routes"));

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Open: http://localhost:${PORT}`);
});
