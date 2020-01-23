import Router, { Request, Response } from 'express';
import * as songService from '../services/song-service';

export const songRouter = Router();

songRouter.post('/get-related-songs', async (req: Request, resp: Response) => {
    const spotifyTrackIds: undefined | string[] = req.body.spotifyTrackIds;
    if (Array.isArray(spotifyTrackIds)) {
        // TODO: Catch and send errors
        const relatedSongs = spotifyTrackIds.length ? await songService.getRelatedSongs(req.body.spotifyTrackIds) : [];
        resp.json(relatedSongs);
    } else {
        resp.status(400).json('Must include spotify track ids.');
    }
});

songRouter.post('/spotify-song-search', async (req: Request, resp: Response) => {
    const searchTerm: undefined | string = req.body.searchTerm;
    if (typeof searchTerm === 'string') {
        // TODO: Catch and send errors
        const searchResults = searchTerm.length ? await songService.spotifySongSearch(req.body.searchTerm) : [];
        resp.json(searchResults);
    } else {
        resp.status(400).json('Must include a search term.');
    }
});

songRouter.post('/recommendations', async (req: Request, resp: Response) => {
    const spotifyTrackIds: undefined | string[] = req.body.spotifyTrackIds;
    if (Array.isArray(spotifyTrackIds)) {
        // TODO: Catch and send errors
        const songRecommendations = spotifyTrackIds.length ? await songService.getSongRecommendations(req.body.spotifyTrackIds) : [];
        resp.json(songRecommendations);
    } else {
        resp.status(400).json('Must include spotify track ids.');
    }
});