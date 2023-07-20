import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit startGameEvent when startGame is called', () => {
    spyOn(component.startGameEvent, 'emit');
    component.startGame();
    expect(component.startGameEvent.emit).toHaveBeenCalled();
  });

  it('should display rules when displayRules is called', () => {
    component.displayRules();
    expect(component.showRules).toBe(true);
  });

  it('should hide rules when hideRules is called', () => {
    component.hideRules();
    expect(component.showRules).toBe(false);
  });

  it('should toggle alphabeticalSorting when toggleSorting is called', () => {
    const initialSorting = component.alphabeticalSorting;
    component.toggleSorting();
    expect(component.alphabeticalSorting).toBe(!initialSorting);
  });

  it('should sort pointSystemList alphabetically when alphabeticalSorting is true', () => {
    component.alphabeticalSorting = true;
    component.sortPointSystemList();
    expect(component.alphabet).toEqual(component.alphabet.sort());
  });

  it('should sort pointSystemList by points when alphabeticalSorting is false', () => {
    component.alphabeticalSorting = false;
    component.sortPointSystemList();

    const sortedAlphabet = component.alphabet.sort((a, b) => component.letterPoints[a] - component.letterPoints[b]);
    expect(component.alphabet).toEqual(sortedAlphabet);
  });
});
