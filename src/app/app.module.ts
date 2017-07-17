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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    MixesComponent,
    LikesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([

      { path: 'profile', component: ProfileComponent, children: [
        {path: '', redirectTo: 'my-mixes', pathMatch: 'full'},
        {path: 'my-mixes', component: MixesComponent},
        {path: 'my-likes', component: LikesComponent}
      ]},
      // { path: 'filterByDateAndName', component: SearchComponent},
      // { path: 'filterByName', component: FilterbynameComponent} // NEED TO CHANGE COMPONENT
    ])
  ],
  // providers: [],
  providers: [sharedApiService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
