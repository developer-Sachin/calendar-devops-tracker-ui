import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarComponent} from './calendar/calendar.component';
import {TestComponent} from './test/test.component';
import {Calendar2Component} from './calendar2/calendar2.component';
import {HomeComponent} from './home/home.component';
import {MonthlyEffortComponent} from './monthly-effort/monthly-effort.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent , children: [
      {path: 'calendar', component: CalendarComponent},
      {path: 'month-effort', component: MonthlyEffortComponent}
    ]},
  {path: 'view-users', component: UserComponent},
  {path: 'cal2', component: Calendar2Component},
  {path: 'test', component: TestComponent},
  {path: '', component: HomeComponent, children: [
      {path: '', component: CalendarComponent},
      {path: '', component: MonthlyEffortComponent}
    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
