import mongoose from 'mongoose';

export interface ISong extends mongoose.Document {
    artistName: string;
    songName: string;
    spotifyTrackId: string;
    albumImageUrl: string;
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
    }
});

export const Song = mongoose.model<ISong>('Song', songSchema);