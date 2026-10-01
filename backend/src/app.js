import express from "express";

import authRouter from "./routes/auth.route.js"
import productRouter from "./routes/product.route.js"

const app = express();

app.use(express.json());


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        "success": true,
        "message": "cartify Api is running..."
    });
})

export default app;