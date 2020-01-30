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