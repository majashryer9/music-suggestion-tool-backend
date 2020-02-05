import * as songDao from '../daos/song-dao';
import * as spotifyService from './spotify-service';
import { errorHandler } from '../util/error-handler';
import { spotifyTrackMapper } from '../util/reusable-functions/spotifyTrackMapper';

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

export const getSongsMatchingQuery = async (searchTerm: string) => {
    try {
        const elasticSearchResults = await songDao.searchForSongsBySongNameOrArtistName(searchTerm);
        const duplicateTracker = new Map<string, boolean>();
        const uniqueSearchResults = elasticSearchResults.filter(result => {
            const isAlreadyAdded = duplicateTracker.get(result.spotifyTrackId);
            duplicateTracker.set(result.spotifyTrackId, true);
            return !isAlreadyAdded;
        });
        return uniqueSearchResults;
    } catch (error) {
        throw errorHandler(error);
    }
}