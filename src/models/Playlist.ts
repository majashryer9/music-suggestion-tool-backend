import mongoose from 'mongoose';
import { ISong, Song } from './Song';

export interface IPlaylist extends mongoose.Document {
    songs: ISong[];
}

const playlistSchema = new mongoose.Schema<IPlaylist>({
    songs: {
        type: [Song.schema]
    }
});

export const Playlist = mongoose.model<IPlaylist>('Playlist', playlistSchema);