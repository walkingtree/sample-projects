import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ContentComponent } from './pages/content/content.component';

const appRoutes: Routes = [
	{
		path: '', component: ContentComponent
	},
	{
		path: 'login', component: LoginComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, { useHash: true })
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }