require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
let serverConnection =""

//TEST CONTROLLER
if(process.env.TEST_MODE=="FALSE"){
  serverConnection= process.env.DB_CONNECTION;
}
else{
  serverConnection =process.env.TEST_DB_CONNECTION
}

const SERVER_PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
//   res.setHeader("Pragma", "no-cache");
//   res.setHeader("Expires", "0");
res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

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
  serverConnection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB CONNECTED")
);


if(process.env.TEST_MODE=="FALSE")
{
app.listen(SERVER_PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${SERVER_PORT}`);
});
}


module.exports =app;