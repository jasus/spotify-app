import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor( private spotifyService:SpotifyService ) {

  }

  ngOnInit() {

    /*this.spotifyService.getArtists( "ed sheeran" )
      .subscribe();*/

      document.getElementById("input-text").focus();

  }

}
