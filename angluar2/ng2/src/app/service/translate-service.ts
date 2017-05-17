import {Injectable, Inject} from '@angular/core';
import { TRANSLATIONS } from './translations';

@Injectable()
export class TranslateService {
	private _currentLang: any;
	public translation: any;
	
	public get currentLang() {
	  return this._currentLang;
	}

  // inject our translations
	constructor(@Inject(TRANSLATIONS) private _translations: any) {
	}

	public use(lang: any): void {
		// set current language
		this._currentLang = lang;
	}

	private translate(key: any): any {
		// private perform translation
		this.translation = key;
    
    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
			return this._translations[this.currentLang][key];
		}

		return this.translation;
	}

	public instant(key: any) {
		// public perform translation
		return this.translate(key); 
	}
}