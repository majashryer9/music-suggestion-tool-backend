import { IPlaylist, Playlist } from '../models/Playlist';

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

export const getPlaylistById = (playlistId: string) => {
    return new Promise<IPlaylist>((resolve, reject) => {
        Playlist.findById(playlistId, (error: Error, playlist: IPlaylist) => {
            if (error) {
                reject(error);
            }
            resolve(playlist);
        });
    });
}