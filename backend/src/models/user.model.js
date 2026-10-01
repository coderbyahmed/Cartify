import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        require: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [30, "Username cannot exceed 30 characters"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },

    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema, "users")

export default User;

