import { IPlaylist } from '../models/Playlist';
import { client } from '../util/elasticsearch-util';

// Save songs to elasticsearch so we can search for playlists by song name
export const saveSongsWithPlaylistId = async (playlist: IPlaylist) => {
    const body: Object[] = [];
    playlist.songs.forEach(song =>
        body.push(
            { index: { _index: 'songs' } },
            {
                songName: song.songName,
                artistName: song.artistName,
                playlistId: playlist.id
            }
        )
    );
    try {
        client.bulk({ refresh: 'true', body });
    } catch (error) {
        console.error(error);
    }
}