import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@components/dashboard';
import { LoginComponent } from '@components/login';
import { AuthGuardService } from '@guards/auth-guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [ AuthGuardService ]
	},
	{ path: '**', redirectTo: 'dashboard' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
