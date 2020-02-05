import mongoose from 'mongoose';

export interface ISong {
    artistName: string;
    songName: string;
    spotifyTrackId: string;
    albumImageUrl: string;
    songPreviewUrl: string | null;
}

const songSchema = new mongoose.Schema<ISong>({
    artistName: {
        type: String,
        required: true
    },
    songName: {
        type: String,
        required: true
    },
    spotifyTrackId: {
        type: String,
        required: true
    },
    albumImageUrl: {
        type: String
    },
    songPreviewUrl: {
        type: String
    }
});

export const Song = mongoose.model('Song', songSchema);