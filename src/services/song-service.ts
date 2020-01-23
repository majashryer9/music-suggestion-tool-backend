import * as playlistDao from '../daos/playlist-dao';
import { ISong } from '../models/Song';
import { findNMostPopularSongs } from '../util/reusable-functions/findNMostPopularSongs';
import { errorHandler } from '../util/error-handler';
import * as spotifyService from './spotify-service';
import { spotifyTrackMapper } from '../util/reusable-functions/spotifyTrackMapper';

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
        const relatedSongs = findNMostPopularSongs(songsFromPlaylists, 10)
            .concat(await getSongRecommendations(spotifyTrackIds));
        return relatedSongs;
    } catch (error) {
        throw errorHandler(error);
    }
}

export const spotifySongSearch = async (searchTerm: string) => {
    try {
        const searchResults = await spotifyService.search(searchTerm);
        return searchResults.map(spotifyTrack => spotifyTrackMapper(spotifyTrack));
    } catch (error) {
        throw errorHandler(error);
    }
}

export const getSongRecommendations = async (spotifyTrackIds: string[]) => {
    try {
        const songRecommendations = await spotifyService.getRecommendations(spotifyTrackIds);
        return songRecommendations.map(spotifyTrack => spotifyTrackMapper(spotifyTrack));
    } catch (error) {
        throw errorHandler(error);
    }
}