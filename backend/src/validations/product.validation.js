import Joi from "joi";

const createProductSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required()
        .messages({
            "string.min": "Product title must be at least 3 characters",
            "string.max": "Product title cannot exceed 100 characters",
            "any.required": "Product title is required",
        }),

    description: Joi.string().trim().min(10).max(1000).required()
        .messages({
            "string.min":
                "Product description must be at least 10 characters",
            "string.max":
                "Product description cannot exceed 1000 characters",
            "any.required": "Product description is required",
        }),

    price: Joi.number().min(0).required()
        .messages({
            "number.min": "Product price cannot be negative",
            "any.required": "Product price is required",
        }),

    category: Joi.string().trim().min(2).max(50).required()
        .messages({
            "string.min": "Product category must be at least 2 characters",
            "string.max": "Product category cannot exceed 50 characters",
            "any.required": "Product category is required",
        }),

    stock: Joi.number().integer().min(0).required()
        .messages({
            "number.base": "Product stock must be a number",
            "number.integer": "Product stock must be an integer",
            "number.min": "Product stock cannot be negative",
            "any.required": "Product stock is required",
        }),

    image: Joi.string().trim().uri().optional()
        .messages({
            "string.uri": "Product image must be a valid URL",
        }),
});



const updateProductSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100)
        .messages({
            "string.min": "Product title must be at least 3 characters",
            "string.max": "Product title cannot exceed 100 characters",
        }),

    description: Joi.string().trim().min(10).max(1000)
        .messages({
            "string.min":
                "Product description must be at least 10 characters",
            "string.max":
                "Product description cannot exceed 1000 characters",
        }),

    price: Joi.number().min(0)
        .messages({
            "number.min": "Product price cannot be negative",
        }),

    category: Joi.string().trim().min(2).max(50)
        .messages({
            "string.min": "Product category must be at least 2 characters",
            "string.max": "Product category cannot exceed 50 characters",
        }),

    stock: Joi.number().integer().min(0)
        .messages({
            "number.base": "Product stock must be a number",
            "number.integer": "Product stock must be an integer",
            "number.min": "Product stock cannot be negative",
        }),

    image: Joi.string().trim().uri()
        .messages({
            "string.uri": "Product image must be a valid URL",
        }),
});

export { createProductSchema, updateProductSchema };