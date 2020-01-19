import axios from 'axios';

export const getUnsplashPhoto = (query?: string) => {
    const baseUrl = `https://api.unsplash.com/`;
    const clientId = process.env.UNSPLASH_CLIENT_ID;
    const url = (query) ? `${baseUrl}photos/random/?client_id=${clientId}&orientation=squarish&count=1&query=${query}` : `${baseUrl}photos/random/?client_id=${clientId}&orientation=squarish&count=1`;
    return axios.get(url)
        .then(result => {
            return result.data[0].urls.small;
        });
}