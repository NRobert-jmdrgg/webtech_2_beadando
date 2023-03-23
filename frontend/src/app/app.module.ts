import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegistryComponent } from './components/private/registry/registry.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserLoginComponent } from './components/public/user-login/user-login.component';
import { UserRegisterComponent } from './components/public/user-register/user-register.component';
import { ProductAddComponent } from './components/private/product-add/product-add.component';
import { LogsPanelComponent } from './components/private/logs-panel/logs-panel.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeScreenComponent } from './components/public/welcome-screen/welcome-screen.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CenteredCardComponent } from './components/centered-card/centered-card.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/private/product/product.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserPageComponent } from './components/private/user-page/user-page.component';
import { authGuard } from './guards/auth/auth.guard';

export function TokenGetter() {
  return localStorage.getItem('accessToken');
}

const routes: Routes = [
  { path: '', component: WelcomeScreenComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  {
    path: 'registry',
    component: RegistryComponent /*canActivate: [authGuard]*/,
  },
  { path: 'product/:id', component: ProductComponent },
  { path: 'user/:id', component: UserPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    RegistryComponent,
    UserLoginComponent,
    UserRegisterComponent,
    ProductAddComponent,
    LogsPanelComponent,
    WelcomeScreenComponent,
    CenteredCardComponent,
    ProductComponent,
    UserPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: TokenGetter,
        allowedDomains: ['localhost:3000', 'localhost:4200'],
      },
    }),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
