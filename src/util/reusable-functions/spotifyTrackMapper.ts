import { SpotifyTrack } from '../../models/SpotifyTrack';
import { ISong } from '../../models/Song';

export const spotifyTrackMapper = (spotifyTrack: SpotifyTrack) => {
    const song: ISong = {
        artistName: spotifyTrack.artists.length ? spotifyTrack.artists[0].name : '',
        songName: spotifyTrack.name,
        spotifyTrackId: spotifyTrack.id,
        albumImageUrl: spotifyTrack.album.images.length ? spotifyTrack.album.images[0].url : '',
        songPreviewUrl: spotifyTrack.preview_url
    };
    return song;
}