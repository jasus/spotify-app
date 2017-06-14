import {Component, NgZone, OnInit} from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";
import {Router} from "@angular/router";

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
  }

  private login(){
    this.spotifyService.getRequestAuthorization();
  }


  ngOnDestroy() {
    (<any>window).angularComponentRef = null;
  }

  private oauthCallback(url){
    console.log(url);

    sessionStorage.setItem('currentUser', url);
    this.router.navigate(['/home']);
  }

}
