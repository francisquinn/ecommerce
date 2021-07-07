const Item = require("../models/item");


const items = (req, res) => {
  Item.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

const single_item = (req, res) => {
  Item.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
};


module.exports = {
  items,
  single_item,
};
