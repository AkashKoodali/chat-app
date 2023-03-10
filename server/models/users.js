const mongoose = require("mongoose");

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
  },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
