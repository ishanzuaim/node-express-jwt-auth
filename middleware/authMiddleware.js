const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "secret value", (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.locals.user = null;
    next();
  }
  jwt.verify(token, "secret value", async (err, decodedToken) => {
    if (err) {
      res.locals.user = null;
      next();
    } else {
      const user = await User.findById(decodedToken.id);
      res.locals.user = user;
      next();
    }
  });
};

module.exports = {
  requireAuth,
  checkUser,
};
