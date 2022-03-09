import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Song } from '../../models/song';
import { AudioPlayerService } from '../../services/audio-player.service';
import { getCurrentDetailsSongAction } from '../../store/songs.actions';
import { selectCurrentDetailsSong } from '../../store/songs.selectors';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  currentDetailsSong$ = this.store.select(selectCurrentDetailsSong)
  song!: Song;
  constructor(
    private acivatedRoute: ActivatedRoute, 
    private readonly store: Store, 
    private audioPlayerService: AudioPlayerService,
    private cdr: ChangeDetectorRef) { }
  @ViewChild('player') playerElRef!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    const id = this.acivatedRoute.snapshot.params['id'];
    this.store.dispatch(getCurrentDetailsSongAction({id}));
    this.currentDetailsSong$.subscribe((song) => {
      if(song)
        this.song = song
    })
  }

  ngAfterViewInit(): void {
    if(this.song) {
      this.audioPlayerService.showPlayer(this.playerElRef.nativeElement, this.song);
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.audioPlayerService.hidePlayer(this.playerElRef.nativeElement, this.song);
  }
}
