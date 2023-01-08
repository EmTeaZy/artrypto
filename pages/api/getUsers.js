import connectDb from "../../middleware/mongoose";
import User from "../../models/User"

export default async function handler(req, res) {
    try {
        await connectDb();
        const users = await User.find({});
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send(err)
    }
}
