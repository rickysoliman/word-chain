import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { GameComponent } from './components/game/game.component';
import { GameOverComponent } from './components/game-over/game-over.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, 
        MainMenuComponent, 
        GameComponent,
        GameOverComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should update app state index correctly', () => {
    component.updateAppState(1);
    expect(component.appStateIndex).toBe(1);
  });

  it('should handle timer finished event correctly', () => {
    const eventData = {
      chain: ['word1', 'word2'],
      cache: new Map(),
      score: 10,
    };
    component.handleTimerFinished(eventData);
    expect(component.wordChain).toEqual(eventData.chain);
    expect(component.wordCache).toBe(eventData.cache);
    expect(component.score).toBe(eventData.score);
    expect(component.appStateIndex).toBe(2);
  });

  it('should handle quit button clicked event correctly', () => {
    component.handleQuitButtonClicked();
    expect(component.appStateIndex).toBe(0);
  });

  it('should return the correct current state template', () => {
    component.appStateIndex = 0;
    expect(component.currentStateTemplate).toBe(component.mainMenuTemplate);

    component.appStateIndex = 1;
    expect(component.currentStateTemplate).toBe(component.gameTemplate);

    component.appStateIndex = 2;
    expect(component.currentStateTemplate).toBe(component.gameOverTemplate);
  });
});
