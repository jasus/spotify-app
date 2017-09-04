import {Component, NgZone, OnInit} from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {Router} from "@angular/router";
import {URLSearchParams} from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private spotifyService:SpotifyService, private router:Router, private zone:NgZone) {
    (<any>window).angularComponentRef = {
      zone: this.zone,
      componentFn: (value) => this.oauthCallback(value),
      component: this
    };
  }

  ngOnInit() {

    if(sessionStorage.getItem('currentUser')){
      this.router.navigate(['/home']);
    }
  }

  private login(){
    this.spotifyService.getRequestAuthorization();
  }

  private getAPIToken( authorizationCode:string ){
    this.spotifyService.getToken(authorizationCode)
      .subscribe(res => {

        sessionStorage.setItem('authorization', res);
        this.router.navigate(['/home']);


      }, error => {
        console.log(error);
      });


  }


  ngOnDestroy() {
    (<any>window).angularComponentRef = null;
  }

  private oauthCallback(url){
    console.log(url);

    let urlOauth = new URL(url);
    let urlParams = new URLSearchParams(urlOauth.search);

    if (urlParams.has('?code')) {

      this.getAPIToken(urlParams.get('?code'));

    }else if (urlParams.has('error')){

      let error = urlParams.get('error');
      console.log(error);
      alert(error);

    }

  }

}
