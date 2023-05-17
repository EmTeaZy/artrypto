import connectDb from "../../middleware/mongoose";
import User from "../../models/User"

export default async function handler(req, res) {
    try {
        const {walletAddress} = req.query;

        console.log("Wallet Address", walletAddress)

        await connectDb();
        const user = await User.findOne({walletAddress: walletAddress});
        const status = user.isVerified;
        res.status(200).json({status});
    } catch (err) {
        res.status(400).json({err})
    }
}
