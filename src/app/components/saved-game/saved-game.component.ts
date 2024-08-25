import {Component, Input} from '@angular/core';
import {GameState} from "../../data/game-state";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-saved-game',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './saved-game.component.html',
  styleUrl: './saved-game.component.css'
})
export class SavedGameComponent {
  @Input() savedGame: GameState = new GameState();
}
