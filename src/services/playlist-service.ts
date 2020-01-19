import * as playlistDao from '../daos/playlist-dao';
import * as songDao from '../daos/song-dao';
import { IPlaylist } from '../models/Playlist';
import { errorHandler } from '../util/error-handler';
import * as unsplashService from './unsplash-service';

export const savePlaylist = async (playlist: IPlaylist) => {
    try {
        const savedPlaylist = await playlistDao.savePlaylist(playlist);
        songDao.saveSongsWithPlaylistId(savedPlaylist);
        return savedPlaylist._id;
    } catch (error) {
        return errorHandler(error);
    }
}

export const getPlaylistImageUrl = async (query?: string) => {
    try {
        return await unsplashService.getUnsplashPhoto(query);
    } catch (error) {
        return errorHandler(error);
    }
}