import { Component, EventEmitter, Output } from '@angular/core';
import { alphabet, introText, rules, pointSystemSubtitle, letterPoints } from '../../game.model';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
    @Output() startGameEvent: EventEmitter<void> = new EventEmitter<void>();

    alphabet = alphabet;
    introText = introText;
    rules = rules;
    pointSystemSubtitle = pointSystemSubtitle;
    letterPoints = letterPoints;
    highScore: number = Number(localStorage.getItem('highScore')) || 0;
    showRules: boolean = false;

    displayRules(): void {
        this.showRules = true;
    }

    hideRules(): void {
        this.showRules = false;
    }

    startGame(): void {
        this.startGameEvent.emit();
    }
}