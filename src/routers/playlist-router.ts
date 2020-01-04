import Router, { Request, Response } from 'express';
import * as playlistService from '../services/playlist-service';

export const playlistRouter = Router();

playlistRouter.post('/save', async (req: Request, resp: Response) => {
    const savedPlaylist = await playlistService.savePlaylist(req.body);
    resp.json(savedPlaylist);
});

playlistRouter.post('/get-related-songs', async (req: Request, resp: Response) => {
    const relatedSongs = await playlistService.getRelatedSongs(req.body.spotifyTrackIds);
    resp.json(relatedSongs);
});