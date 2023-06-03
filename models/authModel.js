import mongoose from "mongoose";
import bcrypt from "bcrypt";
const authSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // role: {
    //   type: String,
    //   default: "USER",
    //   enum: ["ADMIN"],
    // },
  },
  { timestamps: true }
);

authSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    //Generate salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {}
});

authSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const Auth = mongoose.model("auth", authSchema);

export default Auth;
