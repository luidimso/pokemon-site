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
    this.gens.sort((a, b) => {
      return a.id <= b.id ? -1 : 1;
    });
  }


  setReady(gensToTest:any[]){
    if(gensToTest.length == this.gens.length){
      this.ready = true;
      this.genSelected = this.gens[0];
    }
  }

  selectGen(gen:any){
    this.genSelected = gen;
  }

}
