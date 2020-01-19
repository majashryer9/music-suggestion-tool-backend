import { IPlaylist } from '../models/Playlist';
import { client } from '../util/elasticsearch-util';
import { ElasticSongSearchResult } from '../models/ElasticSearchResult';

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
    client.bulk({ refresh: 'true', body })
        .catch(error => console.error(error));
}

export const searchForSongs = async (songName: string) => {
    try {
        const searchResults = await client.search({
            index: 'songs',
            body: {
                query: {
                    match: {
                        songName
                    }
                }
            }
        });
        const songSearchResults: ElasticSongSearchResult[] = searchResults.body.hits.hits;
        return songSearchResults.map((result: ElasticSongSearchResult) => result._source);
    } catch (error) {
        throw error;
    }
}