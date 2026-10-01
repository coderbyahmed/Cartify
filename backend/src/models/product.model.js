import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true,
        minlength: [3, "Product title must be at least 3 characters"],
        maxlength: [100, "Product title cannot exceed 100 characters"],
    },

    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
        minlength: [10, "Product description must be at least 10 characters"],
        maxlength: [1000, "Product description cannot exceed 1000 characters"],
    },

    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price cannot be negative"],
    },

    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true,
        minlength: [2, "Product category must be at least 2 characters"],
        maxlength: [50, "Product category cannot exceed 50 characters"],
    },

    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Product stock cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "Product stock must be an integer",
        },
    },

    image: {
        url: {
            type: String,
            trim: true,
        },

        publicId: {
            type: String,
            trim: true,
        },
    },

}, { timestamps: true });

const product = mongoose.model("Product", productSchema, "products")

export default product;