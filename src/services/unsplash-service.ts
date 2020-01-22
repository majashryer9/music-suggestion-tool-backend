import axios from 'axios';
import { UnsplashImage } from '../models/UnsplashImage';

export const getUnsplashPhoto = (query?: string) => {
    const baseUrl = 'https://api.unsplash.com/';
    const clientId = process.env.UNSPLASH_CLIENT_ID;
    const url = (query) ? `${baseUrl}photos/random/?client_id=${clientId}&orientation=squarish&count=30&query=${query}` : `${baseUrl}photos/random/?client_id=${clientId}&orientation=squarish&count=30`;
    return axios.get(url)
        .then(result => {
            return result.data.map((imageObject: UnsplashImage) => imageObject.urls.small);
        });
}