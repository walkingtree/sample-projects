import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ContentComponent } from './pages/content/content.component';
import { EmployeeService } from './service/employee.service';
import { SearchPipe } from './pipes/search.pipe';
import { TranslateService } from './service/translate-service';
import { TRANSLATION_PROVIDERS } from './service/translations';
import { TRANSLATIONS } from './service/translations';
import { TranslatePipe } from './pipes/translate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    SearchPipe,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: "hi-IN" },
    //{ provide: TRANSLATIONS, useValue: 'hi-IN' },
    EmployeeService,
    TranslateService,
    TRANSLATION_PROVIDERS
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
