import axios from 'axios';
import { SpotifyTrack } from '../models/SpotifyTrack';

const getAccessToken = () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const config = {
        headers: {
            'Authorization': `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    return axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', config)
        .then(result => {
            const accessToken: string = result.data.access_token;
            return accessToken;
        });
}

export const search = async (searchTerm: string) => {
    try {
        const accessToken = await getAccessToken();
        const url = `https://api.spotify.com/v1/search?q=${encodeURI(searchTerm)}&type=track&offset=0&limit=20`;
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
        return axios.get(url, config).then(result => {
            const spotifySongSearchResults: SpotifyTrack[] = result.data.tracks.items;
            return spotifySongSearchResults;
        });
    } catch (error) {
        throw error;
    }
}
