interface SpotifyArtist {
    id: string;
    name: string;
}

interface SpotifyAlbumImage {
    url: string;
}

interface SpotifyAlbum {
    images: SpotifyAlbumImage[];
}

export interface SpotifyTrack {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    preview_url: string;
}