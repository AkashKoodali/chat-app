const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

//
const User = require("../models/users");
const filterObj = require("../utils/filterObject");

//
const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

// Register New User
exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password, verified } = req.body;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "password",
    "email"
  );

  // check verified user with given email exist
  const existing_user = await User.findOne({ email: email });
  if (existing_user && existing_user.verified) {
    res.status(400).json({
      status: "error",
      message: "Email is already in use, Please login.",
    });
  } else if (existing_user) {
    await User.findOneAndUpdate({ email: email }, filteredBody, {
      new: true,
      validateModifiedOnly: true,
    });

    //
    req.userId = existing_user._id;
    next();
  } else {
    // if user record is not available in DB
    const new_user = await User.create(filteredBody);

    // generate OTP and send email to user
    req.userId = new_user._id;

    next();
  }

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
  });
};

//
exports.sendOTP = async (req, res, next) => {
  const { userId } = req;
  const new_otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 min after otp sent

  await User.findByIdAndUpdate(userId, {
    otp: new_otp,
    otp_expiry_time,
  });

  //   TODO send mail
  res.status(200).json({
    status: "success",
    message: "OTP Send Successfully",
  });
};

exports.verifyOTP = async (req, res, next) => {
  // verify OTP and update user record accordingly
  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Email is invalid or OTP expired",
    });
  }

  if (!(await user.correctOTP(otp, user.otp))) {
    res.status(400).json({
      status: "error",
      message: "OTP is incorrect",
    });
  }

  //   OTP is corect
  user.verified = true;
  user.otp = undefined;

  await user.save({ new: true, validateModifiedOnly: true });

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "OTP verified successfully",
    token,
  });
};

// Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Both email and password are required.",
    });
  }
  const userDoc = await Doc.findOne({ email: email }).select("+password");

  if (!userDoc || !(await User.correctPassword(password, userDoc.password))) {
    res
      .status(400)
      .json({ status: "error", message: "Email or password is incorrect" });
  }

  const token = signToken(userDoc._id);

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    token,
  });
};
