import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Song } from '../models/song';
import { pauseSongAction, setCurrentPlayingSongAction, setCurrentTimeAction } from '../store/songs.actions';

@Injectable()
export class AudioPlayerService {
  audio: any;
  audio2: any;
  timeUpdateIntervalRef: any;
  currentTimeUpdated$ = new Subject<number>();
  song: Song | null = null;
  song2: Song | null = null;
  renderer!: Renderer2;

  constructor(@Inject(DOCUMENT) private document: Document, private rendererFactory: RendererFactory2, private readonly store: Store) { 
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.audio = this.renderer.createElement('audio');

    
    this.renderer.appendChild(this.document.body, this.audio);
  }

  showPlayer(el: HTMLElement, song: Song) {
    if(song.id === this.song?.id) {
      this.document.body.removeChild(this.audio);
      this.audio.controls = true;
      el.appendChild(this.audio);
    } else {
      this.song2 = song;
      this.audio2 = this.renderer.createElement('audio');
      this.audio2.controls = true;
      this.audio2.src = song.url;
      this.audio2.addEventListener('play', this.onAudio2Play)
      el.appendChild(this.audio2);
    }
  }

  hidePlayer(el: HTMLElement, song: Song) {
    if(this.song?.id === song.id) {

      el.removeChild(this.audio);
      this.audio.controls = false;
      this.document.body.appendChild(this.audio);

    } else if(this.audio2 && !this.audio2.paused) {

      this.audio2.removeEventListener('play', this.onAudio2Play);
      this.document.body.removeChild(this.audio);
      el.removeChild(this.audio2);
      this.audio2.controls = false;
      this.document.body.append(this.audio2);

      let temp = this.audio;
      this.audio = this.audio2;
      temp.src = null;
      temp = null;
      this.song = this.song2;
    }
  }

  play(song: Song) {
    if(this.audio) {
      const currentSongUrl = this.getCurrentSongUrl(song);
      if(this.audio.src != currentSongUrl) {
        this.audio.src = song.url;
      }
      this.song = song;
      this.audio.play();
      this.audio.addEventListener('pause', this.onPause);
      this.clearTimeUpdateInterval();
      this.timeUpdateIntervalRef = setInterval(() => {
          const currentTime = this.getCurrentTime();
          this.store.dispatch(setCurrentTimeAction({currentTime}));
      }, 100)
    }
  }

  pause(song: Song) {
     const currentSongUrl = this.getCurrentSongUrl(song);
    if(this.audio && this.audio.src == currentSongUrl) {
      this.audio.pause();
      this.clearTimeUpdateInterval();
      this.audio.removeEventListener('pause', this.onPause);
    }
  }

  stop(song: Song) {
    const currentSongUrl = this.getCurrentSongUrl(song);
    if(this.audio && this.audio.src == currentSongUrl) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.clearTimeUpdateInterval();
      this.audio.removeEventListener('pause', this.onPause);
      this.song = null;
    }
  }

  getCurrentTime() {
    if(this.audio) return this.audio.currentTime;
    else return 0;
  }

  private onPause = () => {
    if(this.audio.controls === true && this.song) {
      this.store.dispatch(pauseSongAction({song: this.song}))
    }
  }

  private onAudio2Play = () => {
    if(this.audio2 && this.audio) {
      this.audio.pause();
      if(this.song2)
        this.store.dispatch(setCurrentPlayingSongAction({song: this.song2}));
    }
  }

  private getCurrentSongUrl(song: Song) {
    return window.location.protocol + "//" + window.location.host + "/" + encodeURI(song.url);
  }

  private clearTimeUpdateInterval() {
      if(this.timeUpdateIntervalRef) {
          clearInterval(this.timeUpdateIntervalRef);
          this.timeUpdateIntervalRef = null;
      }
  }

}

