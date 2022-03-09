import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Song } from "../models/song";

export interface SongsState {
    songs: Song[], 
    currentDetailsSong: Song | null, 
    currentPlayingSong: Song | null, 
    status: 'playing' | 'paused' | 'stopped', 
    currentTime: number
}

export interface AppState {
    songs: SongsState
}

export const selectSongsFeature = createFeatureSelector<SongsState>('songs');

export const selectSongs = createSelector(
    selectSongsFeature,
    (state) => state.songs)
    
export const selectStatus = createSelector(
    selectSongsFeature,
    (state) => state.status
)

export const selectCurrentTime = createSelector(
    selectSongsFeature,
    (state) => state.currentTime
)

export const selectCurrentDetailsSong = createSelector(
    selectSongsFeature,
    (state) => state.currentDetailsSong
)

export const selectCurrentPlayingSong = createSelector(
    selectSongsFeature,
    (state) => state.currentPlayingSong
)