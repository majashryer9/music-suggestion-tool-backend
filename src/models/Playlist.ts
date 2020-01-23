import mongoose from 'mongoose';
import { ISong, Song } from './Song';

export interface IPlaylist {
    _id: string;
    songs: ISong[];
}

const playlistSchema = new mongoose.Schema<IPlaylist>({
    songs: {
        type: [Song.schema]
    }
});

export const Playlist = mongoose.model('Playlist', playlistSchema);