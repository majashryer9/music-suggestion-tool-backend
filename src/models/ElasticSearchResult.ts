interface ElasticSongObject {
    songName: string;
    artistName: string;
    playlistId: string;
}

export interface ElasticSongSearchResult {
    _id: string;
    _source: ElasticSongObject;
}