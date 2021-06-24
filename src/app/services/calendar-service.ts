import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DevopsData, DevopsDataDto} from '../domain/devops-data';

@Injectable()
export class CalendarService {

  constructor(private http: HttpClient) {
  }

  getCalendarData(month: number, year: number): Observable<[[DevopsDataDto]]> {
    return this.http.get<[[DevopsDataDto]]>('http://localhost:8080/getData/' + month + '/' + year);
  }

  save(devopsDataDto: DevopsDataDto): Observable<DevopsData> {
    return this.http.post<DevopsData>('http://localhost:8080/saveData', devopsDataDto);
  }

  deleteData(devopsDataDto: DevopsDataDto): Observable<void> {
    return this.http.post<void>('http://localhost:8080/deleteData', devopsDataDto);
  }

}
