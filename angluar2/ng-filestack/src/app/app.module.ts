import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppConfigService } from "providers/services/app-config.services";
import { FileStackComponent } from "app/feature/filestack/filestack";

@NgModule({
  declarations: [
    AppComponent,
    FileStackComponent
  ],

  imports: [
    BrowserModule,
    HttpModule
  ],
  
  providers: [AppConfigService],
  bootstrap: [AppComponent]
})

export class AppModule { }
