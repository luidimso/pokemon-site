import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ready:boolean = false;
  gens:any[] = [];
  genSelected:any;
  pokemons:any[] = [];

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(){
    this.pokemonService.getGens().subscribe((gens:any[]) => {
      for(let gen of gens){
        this.pokemonService.getGen(gen.url).subscribe((g:any) => {
          this.setGens(g);
          this.setReady(gens)
        });
      }
    });
  }


  setGens(gen:any):any{
    gen.names = gen.names.filter((name) => {
      return name.language.name == "en";
    });
    this.gens.push(gen);
  }


  setReady(gensToTest:any[]){
    if(gensToTest.length == this.gens.length){
      this.gens.sort((a, b) => {
        return a.id <= b.id ? -1 : 1;
      });
      this.genSelected = this.gens[0];
      this.setPokemons(this.genSelected);
      this.ready = true;
    }
  }


  selectGen(gen:any){
    if(gen.id != this.genSelected.id && this.genSelected.pokemon_species.length == this.pokemons.length){
      this.genSelected = gen;
      this.setPokemons(gen);
    }
  }


  setPokemons(gen:any){
    this.pokemons = [];
    for(let pokemon of gen.pokemon_species){
      this.pokemonService.getPokemon(pokemon.url).subscribe((p) => {
        this.pokemons.push(p);
        this.defaultPokemonSort();
      });
    }
  }


  defaultPokemonSort(){
    if(this.genSelected.pokemon_species.length == this.pokemons.length){
      this.pokemons.sort((a, b) => {
        return a.order <= b.order ? -1 : 1;
      });
    }
  }
}
