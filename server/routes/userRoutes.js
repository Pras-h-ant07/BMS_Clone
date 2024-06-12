const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.send({
        success: false,
        message: "User already exists",
      });
    }

    // Hasing the password -----------------------------------------------------
    const salt = await bcrypt.genSalt(10);
    const hashPwd = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPwd;
    // -------------------------------------------------------------------------

    const newUser = await User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User Registered",
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.send({
        success: false,
        message: "User doesn't exist",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.send({
        success: false,
        message: "Invalid Password !!",
      });
    }

    // creating JWT token -----------------------------------------------------------
    const Token = jwt.sign({ userId: user._id }, process.env.secretKey_jwt, {
      expiresIn: "1d",
    });
    // -------------------------------------------------------------------------------

    res.send({
      success: true,
      message: "You have successfully logged in",
      token: Token,
      data: user
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
  const user = await User.findById(req.body.userId).select("-password");
  res.send({
    success: true,
    message: "You are still authorized to logged in",
    data: user,
  });
});

module.exports = router;
