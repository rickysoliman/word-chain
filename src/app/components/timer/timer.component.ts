import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Output() timerFinished: EventEmitter<void> = new EventEmitter<void>();
  timeLeft: number = 60;
  timerInterval: any;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerFinished.emit();
  }
}
