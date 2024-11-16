const ExpressError = require("../utils/errorHandler");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Register user
exports.register = wrapAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepicurl",
    },
  });

  sendToken(user, 201, res);
});

// Login user
exports.login = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user has given password and email both
  if (!email || !password) {
    return next(new ExpressError(400, "Please Enter Email & Password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ExpressError(401, "Invaild email or password"));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ExpressError(401, "Invaild email or password"));
  }

  sendToken(user, 200, res);
});
