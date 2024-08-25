import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SquareComponent} from "./components/square/square.component";
import {GameState} from "./data/game-state";
import {FormsModule} from "@angular/forms";
import {SavedGameComponent} from "./components/saved-game/saved-game.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SquareComponent, FormsModule, SavedGameComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'sudoku';

  numbers: Array<Array<number>> = []
  gameName: string = '';
  stateName: string = '';

  savedGames: GameState[] = [];

  constructor() {
    this.clear();
  }

  saveState() {
    let state = new GameState();
    let savedGames: any = {};

    state.gameName = this.gameName;
    state.stateName = this.stateName;
    state.numbers = this.numbers;

    let savedGamesString = localStorage.getItem("savedGames");

    if (savedGamesString) {
      savedGames = JSON.parse(savedGamesString);
    }

    if(!savedGames[this.gameName]){
      savedGames[this.gameName] = {};
    }
    savedGames[this.gameName][this.stateName] = state;

    localStorage.setItem("savedGames", JSON.stringify(savedGames));

    this.loadSavedGames();
  }

  ngOnInit(): void {
    this.loadSavedGames()

  }

  loadSavedGames() {
    this.savedGames =[];
    let savedGamesString = localStorage.getItem("savedGames");

    if (savedGamesString) {
      let savedGames = JSON.parse(savedGamesString);

      for (const key in savedGames) {
        for (const keyState in savedGames[key]) {
            this.savedGames.push(savedGames[key][keyState]);
        }
      }
    }
  }

  loadGame(game: GameState) {
    this.clear();
    this.numbers = game.numbers;
  }

  deleteState(game: GameState) {
    let savedGamesString = localStorage.getItem("savedGames");

    if (!savedGamesString) {
      return;
    }

    let savedGames = JSON.parse(savedGamesString);

    if(savedGames[game.gameName]){
      savedGames[game.gameName][game.stateName] = undefined;
    }

    localStorage.setItem("savedGames", JSON.stringify(savedGames));

    this.loadSavedGames()
  }

  clear() {
    for (let i = 0; i < 9; i++) {
      this.numbers[i] = []
    }
  }
}
