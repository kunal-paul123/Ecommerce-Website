const ExpressError = require("../utils/errorHandler");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

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

//Logout user
exports.logout = wrapAsync(async (req, res, next) => {
  // Clear the cookie by setting it to null and expiring it immediately
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forgot password
exports.forgotPassword = wrapAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ExpressError(404, "User not found"));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requestes this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ExpressError(500, error.message));
  }
});
