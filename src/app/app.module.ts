import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedApiService } from './sharedServices/sharedServices';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { MixesComponent } from './profile/mixes/mixes.component';
import { LikesComponent } from './profile/likes/likes.component';
import { MymixesComponent } from './profile/mymixes/mymixes.component';
import { LoginComponent } from './login/login.component';
import {UserService} from "./sharedServices/user.service";
import {UsersModule} from "./sharedServices/users";
import {MixService} from "./sharedServices/mix.service";
import { ViewmixesComponent } from './profile/viewmixes/viewmixes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    MixesComponent,
    LikesComponent,
    MymixesComponent,
    LoginComponent,
    ViewmixesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'profile', component: ProfileComponent, children: [
        {path: '', redirectTo: 'my-mixes', pathMatch: 'full'},
        {path: 'my-mixes', component: MixesComponent},
        {path: 'my-likes', component: LikesComponent}
      ]},
      {path: 'login', component: LoginComponent},
      {path: 'view-your-mix/:username/:mixname', component: MymixesComponent},
      {path: 'mixers', component: ViewmixesComponent}
    ])
  ],
  providers: [{provide: LocationStrategy, useClass:HashLocationStrategy},UserService,sharedApiService,MixService],
  bootstrap: [AppComponent]
})
export class AppModule { }
