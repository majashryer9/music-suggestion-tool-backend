import { ISong } from './Song';

export interface ElasticSongSearchResult {
    _id: string;
    _source: ISong;
}