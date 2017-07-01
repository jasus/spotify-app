import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { APP_ROUTING } from './app.routes';

//SERVICES
import { SpotifyService } from './services/spotify.service';

//PROVIDERS
import { AuthGuard } from "./guards/auth.guard";

//COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent, HomeComponent, SearchComponent, LoginComponent } from './components/components';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [
    AuthGuard,
    SpotifyService,{
      provide: "SpotifyConfig" ,
      useValue: {
        clientId: 'your client id',
        clientSecret: '',
        redirectUri: 'http://localhost:4200/assets/oauthcallback.html',
        scope: '',
        apiBase: 'https://api.spotify.com/v1',
        apiAccounts: 'https://accounts.spotify.com'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
