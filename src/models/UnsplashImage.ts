interface ImageSizeOptions {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

export interface UnsplashImage {
    urls: ImageSizeOptions
}