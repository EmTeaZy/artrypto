import connectDb from "../../middleware/mongoose";
import User from "../../models/User"

export default async function handler(req, res) {
    try {
        const {username, email, bio, walletAddress, links} = req.body
        await connectDb();
        const user = await User.updateOne({
            username,
            email,
            bio,
            walletAddress,
            links
        });
        res.json({user});
    } catch (err) {
        res.json({err})
    }
}
