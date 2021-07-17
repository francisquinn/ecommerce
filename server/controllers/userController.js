const User = require("../models/user");

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).catch((error) =>
    console.log(error)
  );

  if (user != null) {
    res.send("user found");
  } else {
    res.send("user not found");
  }
};

module.exports = {
  login,
};
