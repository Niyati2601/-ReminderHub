const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { compareSync } = require("bcrypt");
require("../Connection/mongoDb");

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new User({ email, username, password: hashPassword });
    await user
      .save()
      .then(() => res.status(200).json({ message: "Registered Successfully" }));
  } catch (error) {
    res.status(400).json({ message: "User Already exists" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Please Sign-Up" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is not correct" });
    }
    const { password, ...others } = user._doc;
    return res.status(200).json({ others });
  } catch (error) {
    return res.status(200).json({ message: "User Already exists" });
  }
});

module.exports = router;
