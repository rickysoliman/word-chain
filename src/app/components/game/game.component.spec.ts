import { TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameComponent
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(GameComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
