import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    bio: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
})