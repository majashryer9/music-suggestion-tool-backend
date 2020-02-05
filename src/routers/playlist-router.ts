import Router, { Request, Response } from 'express';
import * as playlistService from '../services/playlist-service';
import { IPlaylist } from '../models/Playlist';

export const playlistRouter = Router();

playlistRouter.post('/generate', async (req: Request, resp: Response) => {
    const spotifyTrackIds: undefined | string[] = req.body.spotifyTrackIds;
    if (Array.isArray(spotifyTrackIds)) {
        // TODO: Catch and send errors
        const similarSongs = spotifyTrackIds.length ? await playlistService.generatePlaylist(spotifyTrackIds) : [];
        resp.json(similarSongs);
    } else {
        resp.status(400).json('Must include spotify track ids.');
    }
});

playlistRouter.post('/get-next', async (req: Request, resp: Response) => {
    const { n, lastTimestamp } = req.body;
    if (typeof n === 'number' && typeof lastTimestamp === 'number') {
        const playlists = await playlistService.getNextNPlaylists(n, lastTimestamp);
        resp.json(playlists);
    } else {
        resp.status(400).json('Must include a limit and a last timestamp.')
    }
})

playlistRouter.post('/save', async (req: Request, resp: Response) => {
    const playlist: undefined | IPlaylist = req.body.playlist;
    if (playlist) {
        // TODO: Catch and send errors
        const savedPlaylist = await playlistService.savePlaylist(playlist);
        resp.json(savedPlaylist);
    } else {
        resp.status(400).json('Must include a playlist to save.')
    }
});

playlistRouter.post('/image', async (req: Request, resp: Response) => {
    // TODO: Catch and send errors
    const playlistImageUrl = await playlistService.getPlaylistImageUrl(req.body.query);
    resp.json(playlistImageUrl);
});

playlistRouter.post('/get-containing-songs', async (req: Request, resp: Response) => {
    const spotifyTrackIds: undefined | string[] = req.body.spotifyTrackIds;
    if (Array.isArray(spotifyTrackIds)) {
        // TODO: Catch and send errors
        const playlists = spotifyTrackIds.length ? await playlistService.getAllPlaylistsContainingSongs(spotifyTrackIds) : [];
        resp.json(playlists);
    } else {
        resp.status(400).json('Must include spotify track ids.');
    }
});