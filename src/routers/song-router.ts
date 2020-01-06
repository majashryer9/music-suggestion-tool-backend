import Router, { Request, Response } from 'express';
import * as songService from '../services/song-service';

export const songRouter = Router();

songRouter.post('/get-related-songs', async (req: Request, resp: Response) => {
    const spotifyTrackIds: undefined | string[] = req.body.spotifyTrackIds;
    if (Array.isArray(spotifyTrackIds)) {
        const relatedSongs = spotifyTrackIds.length ? await songService.getRelatedSongs(req.body.spotifyTrackIds) : [];
        resp.json(relatedSongs);
    } else {
        resp.status(400).json('Must include spotify track ids.');
    }
});

songRouter.post('/spotify-song-search', async (req: Request, resp: Response) => {
    const searchTerm: undefined | string = req.body.searchTerm;
    if (typeof searchTerm === 'string') {
        const searchResults = searchTerm.length ? await songService.spotifySongSearch(req.body.searchTerm) : [];
        resp.json(searchResults);
    } else {
        resp.status(400).json('Must include a search term.');
    }
});