const express = require("express");
const env = require("dotenv");
const app = express();
const path = require("path");
const cors = require("cors");
const { connectToDatabase } = require('./common-middleware/index');

//routes
const authRoutes = require("./routes/auth");

//environment variable or you can say constants
env.config();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);



// //create db connection
// connectToDatabase();

const db = require('../models')
db.sequelize.sync().then((req) => {
  //create server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})