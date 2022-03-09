import { Action, createReducer, on } from "@ngrx/store"
import { getCurrentDetailsSongSuccessfullAction, getCurrentPlayingSongSuccessfullAction, getSongsSuccessfullAction, pauseSongAction, playSongAction, setCurrentPlayingSongAction, setCurrentTimeAction, stopSongAction } from "./songs.actions"
import { Song } from "../models/song"
import { SongsState } from "./songs.selectors"

export const initialState: SongsState = {
    songs: [],
    currentDetailsSong: null,
    currentPlayingSong: null,
    status: 'stopped',
    currentTime: 0
}


const _songsReducer = createReducer(initialState,
    on(getSongsSuccessfullAction, (state, { songs }) => {
        return {
            ...state,
            songs
        }
    }),
    on(playSongAction, (state, { song }) => {
        return {
            ...state,
            status: 'playing',
            currentPlayingSong: song
        }
    }),
    on(pauseSongAction, (state, { song }) => {
        return {
            ...state,
            status: song === state.currentPlayingSong ? 'paused' : state.status
        }
    }),
    on(stopSongAction, (state, { song }) => {
        return {
            ...state,
            status: song === state.currentPlayingSong ? 'stopped' : state.status,
            currentPlayingSong: null
        }
    }),
    on(setCurrentTimeAction, (state, { currentTime }) => {
        return {
            ...state,
            currentTime
        }
    }),
    on(getCurrentDetailsSongSuccessfullAction, (state, { song }) => {
        return {
            ...state,
            currentDetailsSong: song
        }
    }),
    on(getCurrentPlayingSongSuccessfullAction, (state, { song }) => {
        return {
            ...state,
            currentPlayingSong: song
        }
    }),
    on(setCurrentPlayingSongAction, (state, { song }) => {
        return {
            ...state,
            currentPlayingSong: song
        }
    }),
)

export const songsReducer = (state: { songs: Song[]; currentDetailsSong: Song | null; currentPlayingSong: Song | null ; status: "playing" | "paused" | "stopped"; currentTime: number } | undefined, action: Action) => {
    return _songsReducer(state, action)
}