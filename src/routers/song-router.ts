import Router, { Request, Response } from 'express';
import * as songService from '../services/song-service';

export const songRouter = Router();

songRouter.post('/get-related-songs', async (req: Request, resp: Response) => {
    const relatedSongs = await songService.getRelatedSongs(req.body.spotifyTrackIds);
    resp.json(relatedSongs);
});

songRouter.post('/spotify-song-search', async (req: Request, resp: Response) => {
    const searchResults = await songService.spotifySongSearch(req.body.searchTerm);
    resp.json(searchResults);
});