import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GameComponent } from './game.component';
import { TimerComponent } from './timer/timer.component';
import { FormsModule } from '@angular/forms';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [GameComponent, TimerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start the countdown on ngAfterViewInit', fakeAsync(() => {
    spyOn(component, 'startCountdown').and.callThrough();
    component.ngAfterViewInit();
    tick(4000);
    expect(component.startCountdown).toHaveBeenCalled();
    expect(component.countdown).toBeNull();
    expect(component.nextLetter).toBeTruthy();
  }));

  it('should handle input correctly', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('.user-input');
    inputElement.value = 'example';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.userInput).toBe('EXAMPLE');
  });

  it('should handle a correct word submission', fakeAsync(() => {
    spyOn(component, 'handleSuccess').and.callThrough();

    component.nextLetter = 'A';
    component.userInput = 'ALWAYS';

    component.validateWord();

    const dictionaryRequest = httpMock.expectOne('https://api.dictionaryapi.dev/api/v2/entries/en/ALWAYS');
    dictionaryRequest.flush([{ meanings: ['definition'] }]);

    const profanityRequest = httpMock.expectOne('https://www.purgomalum.com/service/containsprofanity?text=ALWAYS');
    profanityRequest.flush(false);

    tick(250);

    expect(component.handleSuccess).toHaveBeenCalled();
  }));

  it('should handle an incorrect word submission', fakeAsync(() => {
    spyOn(component, 'handleMistake').and.callThrough();

    component.nextLetter = 'A';
    component.userInput = 'asdf';

    component.validateWord();

    tick(600);

    expect(component.handleMistake).toHaveBeenCalled();
    expect(component.userInput).toBe('A');
  }));

  it('should handle a profane word submission', fakeAsync(() => {
    spyOn(component, 'handleMistake').and.callThrough();

    component.nextLetter = 'B';
    component.userInput = 'BITCH';

    component.validateWord();

    const dictionaryRequest = httpMock.expectOne('https://api.dictionaryapi.dev/api/v2/entries/en/BITCH');
    const profanityRequest = httpMock.expectOne('https://www.purgomalum.com/service/containsprofanity?text=BITCH');
    dictionaryRequest.flush([{ meanings: [] }]);
    profanityRequest.flush(true);

    tick(500);

    expect(component.handleMistake).toHaveBeenCalled();
    expect(component.userInput).toBe('B');
  }));

  it('should handle an API error during word validation', fakeAsync(() => {
    spyOn(component, 'handleMistake').and.callThrough();

    component.nextLetter = 'A';
    component.userInput = 'ASDF';

    component.validateWord();

    const dictionaryRequest = httpMock.expectOne('https://api.dictionaryapi.dev/api/v2/entries/en/ASDF');
    dictionaryRequest.flush([{ meanings: [] }]);

    const profanityRequest = httpMock.expectOne('https://www.purgomalum.com/service/containsprofanity?text=ASDF');
    profanityRequest.error(new ErrorEvent('API error'));

    tick(500);

    expect(component.handleMistake).toHaveBeenCalled();
  }));

  it('should update the next letter correctly', () => {
    component.userInput = 'B';
    component.updateNextLetter();
    expect(component.nextLetter).toBe('B');
    expect(component.userInput).toBe('B');
  });

  it('should emit the timerFinished event when handleTimerFinished is called', () => {
    spyOn(component.timerFinished, 'emit');
    component.handleTimerFinished();
    expect(component.timerFinished.emit).toHaveBeenCalled();
  });

  it('should reset the game state when playAgain is called', () => {
    component.wordChain = ['A', 'B', 'C'];
    component.score = 200;
    component.highScore = 150;

    spyOn(localStorage, 'setItem');

    component.playAgain();

    expect(component.wordChain.length).toBe(0);
    expect(component.score).toBe(0);
    expect(component.highScore).toBe(200);
    expect(component.nextLetter).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith('highScore', '200');
  });

  it('should reset the game state and emit the quitButtonClicked event when quit is called', () => {
    spyOn(component.quitButtonClicked, 'emit');
    component.score = 100;

    component.quit();

    expect(component.score).toBe(0);
    expect(component.quitButtonClicked.emit).toHaveBeenCalled();
  });
});
