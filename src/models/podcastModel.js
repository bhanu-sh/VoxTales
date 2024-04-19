import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    image: {
        type: String,
        default: 'https://files.edgestore.dev/utpzbr9jgl4utdct/myPublicImages/_public/1cd7702d-f45b-40c2-babe-8a257dff282c.png',
    },
    audio: {
        type: String,
        required: [true, 'Audio is required'],
    },
    duration: {
        type: String,
        default: '00:00:00',
    },
    published: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    publisherId: {
        type: String,
        required: [true, 'Publisher ID is required'],
    },
    publisherName: {
        type: String,
        required: [true, 'Publisher Name is required'],
    },
    likedBy: {
        type: [String],
        default: [],
    },
    likes: {
        type: Number,
        default: 0,
    }, createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Podcast = mongoose.models.podcasts || mongoose.model('podcasts', podcastSchema);

export default Podcast;