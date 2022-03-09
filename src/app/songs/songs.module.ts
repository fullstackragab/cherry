import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsRoutingModule } from './songs-routing.module';
import { SongsComponent } from './components/songs/songs.component';
import { SongDetailsComponent } from './components/song-details/song-details.component';
import { StoreModule } from '@ngrx/store';
import { songsReducer } from './store/songs.reducer';
import { AudioPlayerService } from './services/audio-player.service';
import { EffectsModule } from '@ngrx/effects';
import { SongsEffects } from './store/songs.effects';
import { TimePipe } from './pipes/time.pipe';
import { SongsService } from './services/songs.service';


@NgModule({
  declarations: [
    SongsComponent,
    SongDetailsComponent,
    TimePipe
  ],
  imports: [
    CommonModule,
    SongsRoutingModule,
    StoreModule.forFeature('songs', songsReducer),
    EffectsModule.forFeature([ SongsEffects ])
  ],
  providers: [ AudioPlayerService, SongsService ]
})
export class SongsModule { }
