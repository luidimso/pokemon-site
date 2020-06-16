import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  games:any[];

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(){
    this.pokemonService.getGames().subscribe((games) => {
      this.games = games;
    });
  }

}
