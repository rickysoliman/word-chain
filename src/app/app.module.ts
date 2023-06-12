import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TimerComponent } from './components/timer/timer.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { GameComponent } from './components/game/game.component';
import { GameOverComponent } from './components/game-over/game-over.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    MainMenuComponent,
    GameComponent,
    GameOverComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
