import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MeComponent } from './components/me/me.component';
import { FriendsComponent } from './components/friends/friends.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'friends', component: FriendsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'me', component: MeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/register' }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MeComponent,
    FriendsComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
