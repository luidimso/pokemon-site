import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from '../../common';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  public getGames():Observable<any>{
    const headers:HttpHeaders =  new HttpHeaders()
    .set('content-type', 'application/json')

    return this.http.get(env.url+'generation', {headers}).map((response:any)  => {
      return response.results;
    }).catch((error) => {
      return throwError(error);
    });
  }
}
