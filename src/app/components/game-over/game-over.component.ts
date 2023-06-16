import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
})
export class GameOverComponent {
  @Input() wordChain: string[] = [];
  @Input() wordCache: any = {};
  @Input() score: number = 0;
  @Output() playAgainEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() quitEvent: EventEmitter<void> = new EventEmitter<void>();

  highScore: number = Number(localStorage.getItem('highScore')) || 0;
  dropdownStates: { [word: string]: boolean } = {};

  toggleDropdown(word: string): void {
    this.dropdownStates[word] = !this.dropdownStates[word];
  }

  isDropdownOpen(word: string): boolean {
    return this.dropdownStates[word] || false;
  }

  playAgain(): void {
    this.wordChain = [];
    this.wordCache = new Map();
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore.toLocaleString());
    }
    this.playAgainEvent.emit();
  }

  quit(): void {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore.toLocaleString());
    }
    this.quitEvent.emit();
  }
}