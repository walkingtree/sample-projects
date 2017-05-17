import { LANG_EN_NAME, LANG_EN_TRANS  } from './../pages/i18n/en';
import { LANG_HI_NAME, LANG_HI_TRANS } from './../pages/i18n/hi';
import { OpaqueToken } from '@angular/core';


// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all traslations
const dictionary : any = {
	[LANG_EN_NAME]: LANG_EN_TRANS,
	[LANG_HI_NAME]: LANG_HI_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
	{ 
		provide: TRANSLATIONS, 
		useValue: dictionary 
	}
];