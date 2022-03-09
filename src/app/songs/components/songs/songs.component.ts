import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Song } from '../../models/song';
import { AudioPlayerService } from '../../services/audio-player.service';
import { getSongsAction, pauseSongAction, playSongAction, stopSongAction } from '../../store/songs.actions';
import { selectCurrentPlayingSong, selectCurrentTime, selectSongs, selectStatus } from '../../store/songs.selectors';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  songs$ = this.store.select(selectSongs);
  status$ = this.store.select(selectStatus);
  currentTime$ = this.store.select(selectCurrentTime);
  currentPlayingSong$ = this.store.select(selectCurrentPlayingSong);

  constructor(private readonly store: Store, private readonly audioPlayerService: AudioPlayerService) { }

  ngOnInit(): void {
    this.store.dispatch(getSongsAction())
  }

  onPlay(song: Song) {
    this.store.dispatch(playSongAction({ song }));
  }
  
  onPause(song: Song) {
    this.store.dispatch(pauseSongAction({ song }));
  }
  
  onStop(song: Song) {
    this.store.dispatch(stopSongAction({ song }));
  }
}
