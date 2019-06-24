import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppHeaderComponent } from '@components/app-header';
import { DashboardComponent } from '@components/dashboard';
import { LoginComponent } from '@components/login';
import { MovieComponent } from '@components/movie';
import { MyButtonComponent } from '@components/my-button/';


@NgModule({
	declarations: [ 
		AppComponent, 
		AppHeaderComponent ,
		DashboardComponent, 
		LoginComponent, 
		MovieComponent, 
		MyButtonComponent, 
	],
	imports: [ 
		AppRoutingModule, 
		BrowserModule, 
		BrowserAnimationsModule, 
		HttpClientModule, 
		ReactiveFormsModule 
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
