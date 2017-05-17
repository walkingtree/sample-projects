import { Component, Input, Output ,OnInit, EventEmitter  } from '@angular/core';
import { TranslateService } from '../../service/translate-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  public supportedLangs: any;
  public translatedText: string;
  public selectedLang: any;

  constructor(public _translate: TranslateService) { 

  }

  ngOnInit() { 
      this.selectLang();
  }

  selectedValue(){
    this.selectLang(this.selectedLang);
  }

  selectLang(lang?: any) {
    if(!lang) {
      if(localStorage.getItem('lang'))
        lang = localStorage.getItem('lang');
      else 
        lang = 'en';
    }

    localStorage.setItem('lang', lang);

    if( lang == 'en'){
          this.supportedLangs = [
            { display: 'English', value: 'en', id: '0' },
            { display: 'Hindi', value: 'hi', id: '1' }
          ];
          this.selectedLang = this.supportedLangs[0].value;
      }else{
          this.supportedLangs = [
            { display: 'अंग्रेज़ी', value: 'en' },
            { display: 'हिंदी', value: 'hi' }
          ];
          this.selectedLang = this.supportedLangs[1].value;
      }
     this._translate.use(lang);
  }
}
