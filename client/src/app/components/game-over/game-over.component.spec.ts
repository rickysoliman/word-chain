import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameOverComponent } from './game-over.component';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameOverComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit playAgainEvent when playAgain is called', () => {
    spyOn(component.playAgainEvent, 'emit');
    component.playAgain();
    expect(component.playAgainEvent.emit).toHaveBeenCalled();
  });

  it('should emit quitEvent when quit is called', () => {
    spyOn(component.quitEvent, 'emit');
    component.quit();
    expect(component.quitEvent.emit).toHaveBeenCalled();
  });

  it('should toggle dropdown state when toggleDropdown is called', () => {
    const word = 'example';
    component.dropdownStates[word] = false;
    component.toggleDropdown(word);
    expect(component.dropdownStates[word]).toBe(true);
    component.toggleDropdown(word);
    expect(component.dropdownStates[word]).toBe(false);
  });

  it('should return dropdown state as false for non-existing word', () => {
    const word = 'nonexistent';
    const isDropdownOpen = component.isDropdownOpen(word);
    expect(isDropdownOpen).toBe(false);
  });
});
