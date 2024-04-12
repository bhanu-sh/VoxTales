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
        default: 'https://files.edgestore.dev/utpzbr9jgl4utdct/myPublicImages/_public/5b7405bd-b4e8-41bf-af0a-4ec47b5cb542.png',
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
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
})

const Podcast = mongoose.models.podcasts || mongoose.model('podcasts', podcastSchema);

export default Podcast;