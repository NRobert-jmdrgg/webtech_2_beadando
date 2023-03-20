import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TopBarComponent } from './public/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegistryComponent } from './private/registry/registry.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserLoginComponent } from './public/user-login/user-login.component';
import { UserRegisterComponent } from './public/user-register/user-register.component';
import { ProductAddComponent } from './private/product-add/product-add.component';
import { ProductUpdateComponent } from './private/product-update/product-update.component';
import { LogsPanelComponent } from './private/logs-panel/logs-panel.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeScreenComponent } from './public/welcome-screen/welcome-screen.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CenteredCardComponent } from './centered-card/centered-card.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './private/product/product.component';
import { JwtModule } from '@auth0/angular-jwt';

export function TokenGetter() {
  return localStorage.getItem('accessToken');
}

const routes: Routes = [
  { path: '', component: WelcomeScreenComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'registry', component: RegistryComponent },
  { path: 'product/:id', component: ProductComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    RegistryComponent,
    UserLoginComponent,
    UserRegisterComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    LogsPanelComponent,
    WelcomeScreenComponent,
    CenteredCardComponent,
    ProductComponent,
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
