import { PokemonService } from "./pokemon.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { env } from '../../common';

describe('PokemonService', () => {
  let pokemonService:PokemonService;
  let httpTesting:HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    pokemonService = TestBed.get(PokemonService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should get all pokemon generations', ()=> {
    pokemonService.getGens().subscribe((response) => {
      expect(response).toBeTruthy("Nothing returned");
      expect(response.length).toBeGreaterThan(0, "No generation returned");
    });

    const request = httpTesting.expectOne(env.url+"generation");
    expect(request.request.method).toEqual('GET');
    request.flush({results: env.gens});
  });
});
