let port = process.env.PORT;
if (port == null || port == "") {
  //default port number if none is assigned
  port = 3000;
}
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.static('.'));
const Item = require("./models/item");
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

app.post("/checkout", async (req, res) => {
  console.log(req.body.item);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "usd",

          product_data: {
            name: req.body.item,

            images: ["https://i.imgur.com/EHyR2nP.png"],
          },

          unit_amount: 2000,
        },

        quantity: 1,
      },
    ],

    mode: "payment",

    success_url: "https://example.com",

    cancel_url: "https://example.com",
  });

  res.redirect(303, session.url);
});

app.get("/", (req, res) => {
  res.send("Hello World again!");
});
