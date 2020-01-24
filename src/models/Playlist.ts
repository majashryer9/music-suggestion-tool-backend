import mongoose from 'mongoose';
import { ISong, Song } from './Song';

export interface IPlaylist {
    _id: string;
    songs: ISong[];
    imageUrl: string;
    timestamp: number;
}

const playlistSchema = new mongoose.Schema<IPlaylist>({
    songs: {
        type: [Song.schema]
    },
    imageUrl: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

export const Playlist = mongoose.model('Playlist', playlistSchema);