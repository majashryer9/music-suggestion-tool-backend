import Router, { Request, Response } from 'express';
import * as playlistService from '../services/playlist-service';
import { IPlaylist } from '../models/Playlist';

export const playlistRouter = Router();

playlistRouter.post('/save', async (req: Request, resp: Response) => {
    const playlist: undefined | IPlaylist = req.body.playlist;
    if (playlist) {
        const savedPlaylist = await playlistService.savePlaylist(req.body.playlist);
        resp.json(savedPlaylist);
    } else {
        resp.status(400).json('Must include a playlist to save.')
    }
});