const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lasttName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email Name is required"],
    validate: {
      validator: function (email) {
        return String(email)
          .toLocaleLowerCase()
          .match(
            /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
          );
      },
      message: (props) => `Email (${props.value}) is invalid..!`,
    },
    password: {
      type: String,
    },
    passwordConfirm :{
      type: String,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    cretedAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
    otp_expiry_time: {
      type: Date,
    },
  },
});

userSchema.pre("save", async function (next) {
  // Only when this fun if OTP is modified

  if (!this.isModified("otp")) return next();

  // Hash the OTP with the cost of 12
  this.otp = await bcrypt.hash(this.otp, 12);

  next();
});

userSchema.pre("save", async function (next) {
  // Only when this fun if OTP is modified

  if (!this.isModified("password")) return next();

  // Hash the OTP with the cost of 12
  this.password = await bcrypt.hash(this.otp, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
  return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.changedPasswordAfter = function (timestamps) {
  return timestamps > this.passwordChangedAt;
}

const User = new mongoose.model("User", userSchema);
module.exports = User;
