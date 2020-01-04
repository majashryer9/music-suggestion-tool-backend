import mongoose from 'mongoose';

export interface ISong extends mongoose.Document {
    artistName: string;
    songName: string;
    spotifyTrackId: string;
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
    }
});

export const Song = mongoose.model<ISong>('Song', songSchema);