import dotenv from "dotenv";
import chalk from "chalk";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {

        await connectDB();
        const server = app.listen(PORT, () => {

            console.log(chalk.red.bgGreen`🚀 Server Running on port${PORT}`);
            console.log("========================================\n");

        });
        const shutdown = async (signal) => {
            console.log(`\n🛑 ${signal} received. Shutting down server...`);

            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        };

        process.on('SIGINT', () => shutdown('SIGINT'));
        process.on('SIGTERM', () => shutdown('SIGTERM'));

    } catch (error) {

        console.error(chalk.green.bgRed("❌ Server Failed to Start!"));
        console.error(`⚠️ Error: ${error.message}`);
        console.error("========================================\n");

        process.exit(1);
    }
};

startServer();