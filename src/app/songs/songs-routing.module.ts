import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongDetailsComponent } from './components/song-details/song-details.component';
import { SongsComponent } from './components/songs/songs.component';

const routes: Routes = [
  { path: '', component: SongsComponent },
  { path: ':id', component: SongDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
