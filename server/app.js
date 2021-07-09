let port = process.env.PORT;
if (port == null || port == "") {
  //default port number if none is assigned
  port = 8080;
}
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.static("."));
const itemRoutes = require("./routes/itemRoutes");
const stripe = require("stripe")(process.env.STRIPE_SK);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});*/

// Connect to database
const uri = process.env.DB_CONNECT;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  )
  .catch((error) => console.log(error));

// import routes
app.use("/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("Hello World again!");
});
