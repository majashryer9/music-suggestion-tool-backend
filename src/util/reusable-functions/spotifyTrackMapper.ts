import { SpotifyTrack } from '../../models/SpotifyTrack';

export const spotifyTrackMapper = (spotifyTrack: SpotifyTrack) => {
    return {
        artistName: spotifyTrack.artists.length ? spotifyTrack.artists[0].name : '',
        songName: spotifyTrack.name,
        spotifyTrackId: spotifyTrack.id
    };
}