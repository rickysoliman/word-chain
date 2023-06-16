import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should decrement timeLeft until it reaches 0', fakeAsync(() => {
    component.hasGameStarted = true;
    fixture.detectChanges();

    expect(component.timeLeft).toBe(59);

    tick(1000); // Simulate waiting for 1 second
    fixture.detectChanges();

    expect(component.timeLeft).toBe(58);

    tick(58000); // Simulate waiting for 58 seconds
    fixture.detectChanges();

    expect(component.timeLeft).toBe(0);

    tick(1000); // Simulate waiting for 1 additional second to ensure the timer has stopped
    fixture.detectChanges();
  }));
});
