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

playlistRouter.post('/image', async (req: Request, resp: Response) => {
    const playlistImageUrl = await playlistService.getPlaylistImageUrl(req.body.query);
    resp.json(playlistImageUrl);
});

playlistRouter.post('/playlists-containing-song', async (req: Request, resp: Response) => {
    const songName: undefined | string = req.body.songName;
    if (typeof songName === 'string') {
        const playlistsContainingSong = await playlistService.getPlaylistsContainingSong(songName);
        resp.json(playlistsContainingSong);
    } else {
        resp.status(400).json('Must include a song name.')
    }
});