import mongoose from "mongoose"
import dotenv from "dotenv"


export async function ConnectDB() {

    dotenv.config()

    try {

       await mongoose.connect(process.env.MONGO_URL)
        console.log("DataBase Connected")


    } catch (error) {
        console.log(error);

    }

}