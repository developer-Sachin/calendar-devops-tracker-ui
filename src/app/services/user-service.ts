import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DevopsData, DevopsDataDto} from '../domain/devops-data';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../domain/user';

@Injectable()
export class UserService {

  public userAdded$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  addUser(user: User): Observable<void> {
    this.userAdded$.next(user);
    return this.http.post<void>('http://localhost:8080/add-user', user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/get-users');
  }

  deleteUser(userName: string): Observable<void> {
    return this.http.post<void>('http://localhost:8080/delete-user', userName);
  }


  getUserDetails(userName: string): Observable<User> {
    return this.http.get<User>('http://localhost:8080/getUser/' + userName);
  }
}
