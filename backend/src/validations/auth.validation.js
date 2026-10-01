import Joi from "joi";

const registerSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required()
        .messages({
            "string.min": "Username must be at least 3 characters",
            "string.max": "Username cannot exceed 30 characters",
            "any.required": "Username is required"
        }),


    email: Joi.string().trim().lowercase().email().required()
        .messages({
            "string.email": "Please provide a valid email",
            "any.required": "Email is required",
        }),

    password: Joi.string().min(6).required()
        .messages({
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password is required",
        }),

    phone: Joi.string().trim().required().pattern(/^03[0-9]{9}$/)
        .messages({
            "string.pattern.base":
                "Phone number must be a valid Pakistani mobile number",
            "any.required": "Phone number is required",
        })
});


const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required()
        .messages({
            "string.email": "Please provide a valid email",
            "any.required": "Email is required",
        }),

    password: Joi.string().required()
        .messages({
            "any.required": "Password is required",
        }),
});

export { registerSchema, loginSchema };