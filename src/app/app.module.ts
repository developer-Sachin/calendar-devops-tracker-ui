import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { TestComponent } from './test/test.component';
import { Calendar2Component } from './calendar2/calendar2.component';
import {CalendarService} from './services/calendar-service';
import {HttpClientModule} from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';
import {PaginationService} from './services/pagination-service';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MonthlyEffortComponent } from './monthly-effort/monthly-effort.component';
import {UserService} from './services/user-service';
import { UserComponent } from './user/user.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    TestComponent,
    Calendar2Component,
    PaginationComponent,
    HomeComponent,
    MonthlyEffortComponent,
    UserComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [CalendarService, PaginationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
