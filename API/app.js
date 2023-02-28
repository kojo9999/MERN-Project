require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

const SERVER_PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
//   res.setHeader("Pragma", "no-cache");
//   res.setHeader("Expires", "0");
res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
 });
 


const employeeRoute = require("./routes/employee");
const authRoute = require("./routes/auth");
const skillLevelRoute = require("./routes/skillLevel");


app.use("/api/employee", employeeRoute);
app.use("/api/auth", authRoute);
app.use("/api/skillLevel", skillLevelRoute);

app.use(cors({
  origin: '*'
}));

// DB CONNECTION
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB CONNECTED")
);

app.listen(SERVER_PORT, () =>
  console.log(`SERVER RUNNING ON PORT ${SERVER_PORT}`)
);