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
        required: [true, 'Image is required'],
    },
    audio: {
        type: String,
        required: [true, 'Audio is required'],
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
    },
    published: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
})

const Podcast = mongoose.models.podcasts || mongoose.model('podcasts', podcastSchema);

export default Podcast;