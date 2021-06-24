import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user-service';
import {User} from '../domain/user';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService,
              private notificationService: NotificationsService) {
  }

  users: User[] = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    this.userService.userAdded$.subscribe((user) => {
      if (user) {
        this.users.push(user);
      }
    });
  }

  deleteUser(userName: string): void {
    this.userService.deleteUser(userName).subscribe(() => {
      this.notificationService.success('', 'User Deleted Successfully', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
      this.users = this.users.filter(user => user.userName !== userName);
    });
  }
}
