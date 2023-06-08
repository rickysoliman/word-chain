import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start the timer with the initial time', () => {
    expect(component.timeLeft).toBe(60); // Adjust as per your initial time setting
  });

  it('should decrease the timeLeft property every second', () => {
    jasmine.clock().install();
    expect(component.timeLeft).toBe(60); // Adjust as per your initial time setting
    jasmine.clock().tick(1000);
    expect(component.timeLeft).toBe(59);
    jasmine.clock().tick(1000);
    expect(component.timeLeft).toBe(58);
    // ... repeat for other time intervals
    jasmine.clock().uninstall();
  });

  it('should stop the timer when timeLeft reaches zero', () => {
    jasmine.clock().install();
    component.timeLeft = 1;
    jasmine.clock().tick(1000);
    expect(component.timeLeft).toBe(0);
    jasmine.clock().tick(1000);
    expect(component.timeLeft).toBe(0); // Ensure it remains at zero
    jasmine.clock().uninstall();
  });

  it('should stop the timer when stopTimer() is called', () => {
    jasmine.clock().install();
    component.startTimer();
    jasmine.clock().tick(5000);
    component.stopTimer();
    jasmine.clock().tick(5000);
    expect(component.timeLeft).toBe(55);
    jasmine.clock().uninstall();
  });

  // Add more tests as per your requirements

});
