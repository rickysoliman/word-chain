import { Component, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { TimerEventData, Word } from './game.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('mainMenu') mainMenuTemplate!: TemplateRef<any>;
  @ViewChild('game') gameTemplate!: TemplateRef<any>;
  @ViewChild('gameOver') gameOverTemplate!: TemplateRef<any>;

  appState = ['mainMenu', 'game', 'gameOver'];
  appStateIndex = 0;
  wordChain: string[] = [];
  wordCache: Map<string, Word> = new Map();
  score: number = 0;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  updateAppState(index: number): void {
    this.appStateIndex = index;
  }

  handleTimerFinished(eventData: TimerEventData): void {
    this.wordChain = eventData.chain;
    this.wordCache = eventData.cache;
    this.score = eventData.score;
    this.updateAppState(2);
    this.cdRef.detectChanges();
  }

  handleQuitButtonClicked(): void {
    this.updateAppState(0);
    this.cdRef.detectChanges();
  }

  get currentStateTemplate(): TemplateRef<any> {
    if (this.appStateIndex === 0) {
      return this.mainMenuTemplate;
    } else if (this.appStateIndex === 1) {
      return this.gameTemplate;
    } else {
      return this.gameOverTemplate;
    }
  }
}
