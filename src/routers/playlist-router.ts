import Router, { Request, Response } from 'express';
import * as playlistService from '../services/playlist-service';

export const playlistRouter = Router();

playlistRouter.post('/save', async (req: Request, resp: Response) => {
    const savedPlaylist = await playlistService.savePlaylist(req.body.playlist);
    resp.json(savedPlaylist);
});