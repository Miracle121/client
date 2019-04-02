import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AngulaMaterialModule } from './angular-material.module';
import { HeaderComponent } from './header/header.component';
import { AuthModule} from './auth/auth.module';
import { UserModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    AuthModule,
    AngulaMaterialModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
