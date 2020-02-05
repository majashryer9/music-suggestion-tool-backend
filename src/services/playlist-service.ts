import * as playlistDao from '../daos/playlist-dao';
import * as songDao from '../daos/song-dao';
import * as songService from './song-service';
import * as unsplashService from './unsplash-service';
import { IPlaylist } from '../models/Playlist';
import { ISong } from '../models/Song';
import { errorHandler } from '../util/error-handler';
import { findNMostPopularSongs } from '../util/reusable-functions/findNMostPopularSongs';

export const generatePlaylist = async (spotifyTrackIds: string[]) => {
    try {
        const playlistsContainingSongs = await playlistDao.getAllPlaylistsContainingSongs(spotifyTrackIds);
        const songsFromPlaylists: ISong[] = [];
        playlistsContainingSongs.forEach(playlist =>
            // Only add the songs that aren't being used to query database
            songsFromPlaylists.push(
                ...playlist.songs
                    .filter(song => !spotifyTrackIds.some(spotifyTrackId => spotifyTrackId === song.spotifyTrackId))
            )
        );
        const similarSongs = findNMostPopularSongs(songsFromPlaylists, 10)
            .concat(await songService.getSongRecommendations(spotifyTrackIds));
        return similarSongs;
    } catch (error) {
        throw errorHandler(error);
    }
}

export const getNextNPlaylists = async (n: number, lastTimestamp: number) => {
    try {
        const playlists = await playlistDao.getNextNPlaylists(n, lastTimestamp);
        return playlists;
    } catch (error) {
        throw errorHandler(error);
    }
}

export const savePlaylist = async (playlist: IPlaylist) => {
    try {
        playlist.timestamp = Date.now();
        const savedPlaylist = await playlistDao.savePlaylist(playlist);
        songDao.saveSongsWithPlaylistId(savedPlaylist.songs);
        return savedPlaylist._id;
    } catch (error) {
        throw errorHandler(error);
    }
}

export const getPlaylistImageUrl = async (query?: string) => {
    try {
        return await unsplashService.getUnsplashPhoto(query);
    } catch (error) {
        throw errorHandler(error);
    }
}