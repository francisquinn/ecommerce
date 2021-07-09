require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SK);

const items = async (req, res) => {
  // retrieve all the price objects
  const price = await stripe.prices
    .list({
      active: true,
    })
    .catch((error) => console.log(error));

  var items = [];

  for (const val of price.data) {
    // loop to collect product id and unit price
    const product_price = val.unit_amount;
    const product_id = val.product;
    // retrieve the product with the id
    const product = await stripe.products.retrieve(product_id);
    const product_name = product.name;
    // store product details in a JSON object
    const product_item = {
      id: product_id,
      name: product_name,
      price_id: val.id,
      price: product_price,
      quantity: 3,
    };
    // Add JSON object to the array
    items.push(product_item);
  }
  res.send(items);
};

const item_checkout = async (req, res) => {
  var items_array = [];
  var cart_items = req.body.items;

  for (const key of Object.keys(cart_items)) {
    const cart_item = cart_items[key];
    // retrieve the price with the id
    const price = await stripe.prices
      .retrieve(cart_item.price)
      .catch((error) => console.log(error));

    const line_item = {
      price_data: {
        currency: "eur",
        product_data: {
          name: cart_item.name,
        },
        unit_amount: price.unit_amount,
      },
      quantity: cart_item.quantity,
    };
    items_array.push(line_item);
  }

  // create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items_array,
    mode: "payment",
    success_url: "https://example.com",
    cancel_url: "https://example.com",
  });

  res.redirect(303, session.url);
};

const getItem = async (req, res) => {
  const product_id = req.params.id; // extract the product_id from the params

  // retrieve all the price objects
  const price = await stripe.prices
    .list({
      active: true,
    })
    .catch((error) => console.log(error));

  var product_item = {};

  for (const val of price.data) {
    // loop to check when product ids are equal
    if (val.product === product_id) {
      // retrieve the product with the id
      const product = await stripe.products.retrieve(product_id);
      const product_name = product.name;
      // store details in a JSON object
      product_item = {
        id: product_id,
        price_id: val.id,
        name: product_name,
        price: val.unit_amount,
      };
    }
  }
  res.send(product_item);
};

module.exports = {
  items,
  item_checkout,
  getItem,
};
