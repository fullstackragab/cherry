import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from '../models/song';

@Injectable()
export class SongsService {
  private songs: Song[] = [
    {
      id: 'song-1',
      title: 'Law Betheb',
      artist: 'Amr Diab',
      avatar: 'assets/songs/thumbs/song-1.jpg',
      duration: '03:21',
      url: 'assets/songs/amr diab/Amr Diab - Law Betheb.mp4'
    },
    {
      id: 'song-2',
      title: 'Katr Min Orbak',
      artist: 'Amr Diab',
      avatar: 'assets/songs/thumbs/song-2.jpg',
      duration: '03:07',
      url: 'assets/songs/amr diab/Amr Diab - Katr Min Orbak.mp4'
    },
    {
      id: 'song-3',
      title: 'Babtdy Mel Zero',
      artist: 'Amr Diab',
      avatar: 'assets/songs/thumbs/song-3.jpg',
      duration: '03:01',
      url: 'assets/songs/amr diab/Amr Diab - Babtdy Mel Zero.mp4'
    },
    {
      id: 'song-4',
      title: 'Khala El Hagar Yenta',
      artist: 'Amr Diab',
      avatar: 'assets/songs/thumbs/song-4.jpg',
      duration: '03:27',
      url: 'assets/songs/amr diab/Amr Diab - Khala El Hagar Yenta.mp4'
    },
  ]
  constructor() { }

  getSongs(): Observable<Song[]> {
    return of(this.songs)
  }

  getSong(id: string): Observable<Song | undefined> {
    return of(this.songs.find(song => song.id === id))
  }
}
