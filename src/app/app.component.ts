import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef;
  alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  nextLetter: string = this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
  userInput: string = '';
  wordChain: string[] = [];

  ngAfterViewInit(): void {
    this.inputField.nativeElement.focus();
  }

  onInput(event: Event): void {
    const htmlElement = event.target as HTMLInputElement;
    this.userInput = htmlElement.value.toUpperCase();
  }

  onSubmit(): void {
    // if (!this.validateWord(this.userInput)) return;
    this.wordChain.push(this.userInput);
    this.updateNextLetter();
  }

  updateNextLetter(): void {
    this.nextLetter = this.userInput[this.userInput.length - 1];
    this.userInput = '';
  }
}
