import { IPlaylist, Playlist } from '../models/Playlist';

export const getNextNPlaylists = (n: number, lastTimestamp: number) => {
    const query = lastTimestamp > 0 ? { timestamp: { $lt: lastTimestamp } } : {};
    return new Promise<IPlaylist[]>((resolve, reject) => {
        Playlist.find(query, (error: Error, playlists: IPlaylist[]) => {
            if (error) {
                reject(error);
            }
            resolve(playlists);
        })
            .limit(n)
            .sort({ timestamp: -1 });
    });
}

export const savePlaylist = (playlist: IPlaylist) => {
    return new Promise<IPlaylist>((resolve, reject) => {
        Playlist.create(playlist, (error: Error, savedPlaylist: IPlaylist) => {
            if (error) {
                reject(error);
            };
            resolve(savedPlaylist);
        });
    });
}

export const getAllPlaylistsContainingSongs = (spotifyTrackIds: string[]) => {
    return new Promise<IPlaylist[]>((resolve, reject) => {
        Playlist.find({ 'songs.spotifyTrackId': { $in: spotifyTrackIds } }, (error: Error, playlists: IPlaylist[]) => {
            if (error) {
                reject(error);
            }
            resolve(playlists);
        });
    });
}