import { createAction, props } from "@ngrx/store";
import { Song } from "../models/song";


export const getSongsAction = createAction('[Songs] get songs');
export const getSongsSuccessfullAction = createAction('[Songs] get songs successfull', props<{ songs: Song[]}>());
export const getCurrentDetailsSongAction = createAction('[Songs] get current details song', props<{ id: string }>());
export const getCurrentDetailsSongSuccessfullAction = createAction('[Songs] get current details song successfull', props<{ song: Song }>());
export const getCurrentPlayingSongAction = createAction('[Songs] get current playing song', props<{ song: Song }>());
export const getCurrentPlayingSongSuccessfullAction = createAction('[Songs] get current playing song successfull', props<{ song: Song }>());
export const setCurrentPlayingSongAction = createAction('[Songs] set current playing song', props<{ song: Song }>());
export const playSongAction = createAction('[Songs] play song', props<{ song: Song }>());
export const pauseSongAction = createAction('[Songs] pause song', props<{ song: Song }>());
export const stopSongAction = createAction('[Songs] stop song', props<{ song: Song }>());
export const setCurrentTimeAction = createAction('[Songs] get current time', props<{ currentTime: number }>());
