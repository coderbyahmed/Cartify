import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

const connectDB = async () => {

    try {

        const connection = await mongoose.connect(process.env.MONGO_DB_URI);


        console.log("========================================");
        console.log(chalk.red.bgGreen("✅ MongoDB Connected Successfully!"));
        console.log(`🗄️ Database: ${connection.connection.name}`);
        console.log("========================================");

    } catch (error) {

        console.log("========================================");
        console.error(chalk.green.bgRed("❌ MongoDB Connection Failed!"));
        console.error(`⚠️ Error: ${error.message}`);
        console.log("========================================");
        process.exit(1);
    }

};

export default connectDB;