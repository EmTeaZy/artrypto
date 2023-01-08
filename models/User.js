import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true,
    },
    links: {
        instagram: {
            type: String,
            required: false,
        },
        twitter: {
            type: String,
            required: false,
        }
    }
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
