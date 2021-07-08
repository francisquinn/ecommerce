let port = process.env.PORT;
if (port == null || port == "") {
  //default port number if none is assigned
  port = 8080;
}
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("."));
const itemRoutes = require("./routes/itemRoutes");
const stripe = require("stripe")(process.env.STRIPE_SK);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
