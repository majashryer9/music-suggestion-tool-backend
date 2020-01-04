import { ISong } from '../../models/Song';

interface SongAndNumOccurrences {
    numOccurrences: number;
    song: ISong;
}

export const findNMostPopularSongs = (songs: ISong[], N: number) => {
    const idToSongAndNumOccurrences = new Map<string, SongAndNumOccurrences>();
    songs.forEach(song => {
        const songAndNumOccurrences = idToSongAndNumOccurrences.get(song.spotifyTrackId);
        if (songAndNumOccurrences) {
            idToSongAndNumOccurrences.set(
                song.spotifyTrackId,
                {
                    song,
                    numOccurrences: songAndNumOccurrences.numOccurrences + 1
                }
            );
        } else {
            idToSongAndNumOccurrences.set(
                song.spotifyTrackId,
                {
                    song,
                    numOccurrences: 1
                }
            );
        }
    });
    const sortedKeys = Array.from(idToSongAndNumOccurrences.keys()).sort((keyA, keyB) => {
        const songAndNumOccurrencesA = idToSongAndNumOccurrences.get(keyA);
        const songAndNumOccurrencesB = idToSongAndNumOccurrences.get(keyB);
        if (songAndNumOccurrencesA && songAndNumOccurrencesB) {
            return songAndNumOccurrencesB.numOccurrences - songAndNumOccurrencesA.numOccurrences;
        }
        return 0;
    });
    const nMostPopularSongs: ISong[] = [];
    const n = sortedKeys.length < N ? sortedKeys.length : N;
    for (let i = 0; i < n; i++) {
        const key = sortedKeys[i];
        const songAndNumOccurrences = idToSongAndNumOccurrences.get(key);
        if (songAndNumOccurrences) {
            if (songAndNumOccurrences.numOccurrences > 1) {
                nMostPopularSongs.push(songAndNumOccurrences.song);
            } else {
                const randomKey = sortedKeys[Math.floor(Math.random() * sortedKeys.length)];
                // If the song hasn't already been added 
                if (!nMostPopularSongs.some(song => song.spotifyTrackId === randomKey)) {
                    const randomSong = idToSongAndNumOccurrences
                        .get(randomKey);
                    if (randomSong) {
                        nMostPopularSongs.push(randomSong.song);
                    }
                }
            }
        }
    }
    return nMostPopularSongs;
}