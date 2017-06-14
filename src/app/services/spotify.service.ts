import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artists:any [] = [];

  API_SPOTIFY:string = 'https://api.spotify.com/v1/';
  CLIENT_ID:string = 'your client id';
  ACCOUNTS:string = 'https://accounts.spotify.com/';
  REDIRECT_URI:string = 'http://localhost:4200/assets/oauthcallback.html';
  urlSearch:string = 'search';
  urlAuthorize:string = 'authorize';

  constructor( private http:Http ) { }

  getRequestAuthorization (){

      let query = `?response_type=code&client_id=${this.CLIENT_ID}&redirect_uri=${encodeURIComponent(this.REDIRECT_URI)}`;
      let url = this.ACCOUNTS + this.urlAuthorize + query;
      window.open(url, '_blank', 'location=no');

  }

  getArtists ( search:string ){

    let query = `?q=${ search }&type=artist`;
    let url = this.API_SPOTIFY + this.urlSearch + query;

    return this.http.get( url )
      .map( res => {
        console.log(res.json());
      });

  }

}
