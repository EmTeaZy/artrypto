import connectDb from "../../middleware/mongoose";
import User from "../../models/User"

export default async function handler(req, res) {
    try {
        const {username, email, bio, walletAddress,imgid, links} = req.body
        await connectDb();
        const user = await User.create({
            username,
            email,
            bio,
            walletAddress,
            imgid,
            links
        });
        res.status(200).json({user});
    } catch (err) {
        res.status(400).json({err})
    }
}
