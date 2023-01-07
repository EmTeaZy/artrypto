import mongoose from "mongoose"

mongoose.set('strictQuery', true);
const connectDb = async () => mongoose.connect(process.env.MONGO_URL);

export default connectDb;
