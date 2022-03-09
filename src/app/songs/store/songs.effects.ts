import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
import { AudioPlayerService } from "../services/audio-player.service";
import { SongsService } from "../services/songs.service";
import { getCurrentDetailsSongAction, getCurrentDetailsSongSuccessfullAction, getCurrentPlayingSongAction, getCurrentPlayingSongSuccessfullAction, getSongsAction, getSongsSuccessfullAction, pauseSongAction, playSongAction, stopSongAction } from "./songs.actions";

@Injectable()
export class SongsEffects {

    playSong$ = createEffect(() => this.actions$.pipe(
        ofType(playSongAction),
        tap(({song}) => {
            this.audioPlayerService.play(song);
        })
    ), { dispatch: false})
    
    pauseSong$ = createEffect(() => this.actions$.pipe(
        ofType(pauseSongAction),
        tap(({ song }) => {
            this.audioPlayerService.pause(song);
        })
    ), { dispatch: false })
    
    stopSong$ = createEffect(() => this.actions$.pipe(
        ofType(stopSongAction),
        tap(({ song }) => {
            this.audioPlayerService.stop(song);
        })
    ), { dispatch: false })

    getCurrentDetailsSong$ = createEffect(() => this.actions$.pipe(
        ofType(getCurrentDetailsSongAction),
        switchMap(({id}) => {
            return this.songsService.getSong(id)
        }),
        map((song) => {
            if(song !== undefined)
                return getCurrentDetailsSongSuccessfullAction({song})
            else return Empty()
        })
    ))

    getCurrentPlayingSong$ = createEffect(() => this.actions$.pipe(
        ofType(getCurrentPlayingSongAction),
        map(({song}) => {
            if(song !== undefined)
                return getCurrentPlayingSongSuccessfullAction({song})
            else return Empty()
        })
    ))

    getSongs$ = createEffect(() => this.actions$.pipe(
        ofType(getSongsAction),
        switchMap(() => {
            return this.songsService.getSongs()
        }),
        map((songs) => {
            return getSongsSuccessfullAction({songs})
        })
    ))
    

    constructor(private actions$: Actions, private audioPlayerService: AudioPlayerService, private songsService: SongsService) {}
}

function Empty(): any {
    throw new Error("Function not implemented.");
}
