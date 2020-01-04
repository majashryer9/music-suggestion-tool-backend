import * as playlistDao from '../daos/playlist-dao';
import * as songDao from '../daos/song-dao';
import { IPlaylist } from '../models/Playlist';
import { errorHandler } from '../util/error-handler';
import { ISong } from '../models/Song';
import { findNMostPopularSongs } from '../util/reusable-functions/findNMostPopularSongs';

export const savePlaylist = async (playlist: IPlaylist) => {
    try {
        const savedPlaylist = await playlistDao.savePlaylist(playlist);
        songDao.saveSongsWithPlaylistId(savedPlaylist);
        return savedPlaylist._id;
    } catch (error) {
        return errorHandler(error);
    }
}

export const getRelatedSongs = async (spotifyTrackIds: string[]) => {
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
        const mostPopularSongs = findNMostPopularSongs(songsFromPlaylists, 10);
        // TODO: If not enough songs returned from findNMostPopularSongs, call spotify recommendations 
        return mostPopularSongs;
    } catch (error) {
        return errorHandler(error);
    }
}