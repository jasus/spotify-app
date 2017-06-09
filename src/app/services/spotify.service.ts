import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artists:any [] = [];

  API_SPOTIFY:string = "https://api.spotify.com/v1/";
  urlSearch:string = "search";

  constructor( private http:Http ) { }

  getArtists ( search:string ){

    let query = `?q=${ search }&type=artist`;
    let url = this.API_SPOTIFY + this.urlSearch + query;

    return this.http.get( url )
      .map( res => {
        console.log(res.json());
      });

  }

}
