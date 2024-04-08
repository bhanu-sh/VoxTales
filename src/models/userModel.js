import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'https://www.gravatar.com/avatar/?d=mp',
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    following: {
        type: [String],
        default: [],
    },
    followers: {
        type: [String],
        default: [],
    },
    role: {
        type: String,
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;