import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import sendEmail from "../utils/email.mailer.js";

const registerUser = async ({ username, email, password, phone }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    phone,
  });

  await sendEmail({
    to: user.email,
    subject: "Welcome to Cartify",
    html: `
      <h2>Welcome to Cartify, ${user.username}!</h2>
      <p>Your account has been created successfully.</p>
      <p>Thank you for joining Cartify.</p>
    `,
  });

  const userResponse = {
    id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return userResponse;
};


const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  const userResponse = {
    id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone,
  };

  return {
    user: userResponse,
    accessToken,
  };
};


const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export { registerUser, loginUser, getProfile };