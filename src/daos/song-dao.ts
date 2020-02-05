import { client } from '../util/elasticsearch-util';
import { ElasticSongSearchResult } from '../models/ElasticSongSearchResult';
import { ISong } from '../models/Song';

// Save songs to elasticsearch so we can search for songs that are actually in Mongo
export const saveSongsWithPlaylistId = async (songs: ISong[]) => {
    const body: Object[] = [];
    songs.forEach(song =>
        body.push(
            { index: { _index: 'songs' } },
            {
                songName: song.songName,
                artistName: song.artistName,
                spotifyTrackId: song.spotifyTrackId,
                albumImageUrl: song.albumImageUrl
            }
        )
    );
    client.bulk({ refresh: 'true', body })
        .catch(error => console.error(error));
}

export const searchForSongsBySongNameOrArtistName = async (query: string) => {
    try {
        const searchResults = await client.search({
            index: 'songs',
            body: {
                query: {
                    multi_match: {
                        query,
                        fields: ['songName', 'artistName']
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