const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const Token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(Token, process.env.secretKey_jwt);
    req.body.userId = verifiedToken.userId;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Invalid Token" });
  }
};
