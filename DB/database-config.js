import mongoose from "mongoose";
export const databaseConfig =async ()=>{
    try {
        const url = process.env.DB_URL
        const dbName = process.env.DB_Name

        const ConnectionInstance = await mongoose.connect(`${url}/${dbName}`)
        console.log(`Connected to ${ConnectionInstance?.connection?.db?.databaseName}`)
    } catch (error) {
        console.log("Error in Connecting to Database  ::",error.message)
    }
}