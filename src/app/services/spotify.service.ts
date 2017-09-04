import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Request } from '@angular/http';
import 'rxjs/add/operator/map';

export interface SpotifyConfig {
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  scope: string,
  authToken?: string,
  apiBase: string,
  apiAccounts: string,
}

interface HttpRequestOptions {
  method?: string,
  url: string,
  search?: Object,
  body?: Object,
  headers?: Headers,
}

@Injectable()
export class SpotifyService {

  artists:any [] = [];

  constructor( @Inject("SpotifyConfig") private config:SpotifyConfig, private http:Http) { }

  // USERS AND TOKEN API CALLS

  getRequestAuthorization (){

    let query = `?response_type=code&client_id=${this.config.clientId}&redirect_uri=${encodeURIComponent(this.config.redirectUri)}`;
    let url = this.config.apiAccounts + '/authorize/' + query;
    window.open(url, '_blank', 'location=no');

  }

  getToken ( authorizationCode:string ){

    let header:Headers = new Headers();
    this.createAuthorizationHeader(header);

    return this.apiAccounts({
      method: 'POST',
      url: '/api/token',
      body: this.toQueryString({
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: this.config.redirectUri
      }),
      headers: header
    }).map(res => res.json());

  }

  getRefreshToken ( refreshToken:string ){
    let header:Headers = new Headers();
    this.createAuthorizationHeader(header);

    return this.apiAccounts({
      method: 'POST',
      url: '/api/token',
      body: this.toQueryString({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }),
      headers: header
    }).map(res => res.json());
  }

  getUser ( ){
    let header:Headers = new Headers();
    this.createAuthorizationHeader(header);

    return this.api({
      method: 'GET',
      url: '/me',
      body: this.toQueryString({ }),
      headers: header
    }).map(res => res.json());
  }

  private createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa(`${this.config.clientId}:${this.config.clientSecret}`));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }


  private toQueryString(obj: Object): string {
    var parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    };
    return parts.join('&');
  };


  private api(requestOptions: HttpRequestOptions) {
    return this.http.request(new Request({
      url: this.config.apiBase + requestOptions.url,
      method: requestOptions.method || 'GET',
      search: this.toQueryString(requestOptions.search),
      body: JSON.stringify(requestOptions.body),
      headers: requestOptions.headers
    }));
  }

  private apiAccounts(requestOptions: HttpRequestOptions){
    return this.http.request(new Request({
      url: this.config.apiAccounts + requestOptions.url,
      method: requestOptions.method || 'GET',
      search: this.toQueryString(requestOptions.search),
      body: requestOptions.body,
      headers: requestOptions.headers
    }));
  }

  // API CALLS

  getArtists ( artists: string | Array<string> ){

    return this.api({
      method: 'GET',
      url: '/artists/',
      search: { ids: artists.toString() }
    }).map(res => res.json());

  }

}
