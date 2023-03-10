import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [AppComponent, TopBarComponent],
  imports: [BrowserModule, RouterModule.forRoot([{}])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
