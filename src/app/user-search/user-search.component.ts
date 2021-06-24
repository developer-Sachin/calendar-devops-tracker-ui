import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user-service';
import {Subject} from 'rxjs';
import {User, UserPage} from '../domain/user';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  @Output() user = new EventEmitter<User>();

  loading = false;

  pageNumber = 0;
  userPage: UserPage;
  itemsBeforeEnd = 10;

  searchTerm: string;
  searchResponse = new Subject<string>();

  loadedUsers: User[] = [{userName: 'w7eecr6'}, {userName: 'yu64738'}];
  selectedUser: User;

  constraints = {
    minLength: 5,
    maxLength: 8,
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.searchResponse
      .asObservable()
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((term: string) => {
        this.pageNumber = 0;
        this.userPage = null;
        this.searchTerm = term;
        this.load(0, term);
      });
  }

  @Input() set initUserId(userName: string) {
    if (userName == null) {
      return;
    }

    this.userService.getUserDetails(userName).subscribe((user: User) => {
      this.selectedUser = user;
      this.onChange(user);
    });
  }

  onChange(user: User) {
    this.user.emit(user);
  }

  onScroll({start, end}) {
    if (this.loading) {
      return;
    }

    // do not preload users, wait for search
    if (start === 0 && end === 0) {
      return;
    }

    if (end > this.loadedUsers.length - this.itemsBeforeEnd) {
      this.fetchMore();
    }
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  private fetchMore() {
    if (this.loading || (this.userPage && this.userPage.last)) {
      return;
    }

    this.load(this.pageNumber, this.searchTerm);
    this.pageNumber++;
  }

  load(pageNo: number, searchTerm?: string) {
    this.loading = true;

    let requestParams: HttpParams = new HttpParams();
    if (searchTerm && searchTerm.length > 0) {
      requestParams = requestParams.set('filter', searchTerm);
    }
    requestParams = requestParams.set('showUsersWithPermissions', 'false');
    requestParams = requestParams.set('page', pageNo.toString());
    /*this.userManagementService
      .getUserInfo(requestParams)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((userPage: UserPage) => {
        if (userPage) {
          if (pageNo === 0) {
            this.loadedUsers = userPage.content;
          } else {
            this.loadedUsers = this.loadedUsers.concat(userPage.content);
          }
          this.userPage = userPage;
        }
        this.changeDetector.markForCheck();
      });*/
  }

  createOptionText(item: User): string {
    const hasFamilyName = item.lastName && item.lastName.length > 0;
    const hasGivenName = item.firstName && item.firstName.length > 0;

    const name: string[] = [];
    if (hasFamilyName) {
      name.push(item.lastName);
    }

    if (hasGivenName) {
      name.push(item.firstName);
    }

    let result = name.join(', ');
    if (result.length > 0) {
      result = result + ` (${item.userName.toLowerCase()})`;
    } else {
      result = item.userName.toLowerCase();
    }

    return result;
  }

  isValidUserName(name: string): boolean {
    if (name == null) {
      return false;
    }

    let valid =
      name.length >= this.constraints.minLength &&
      name.length <= this.constraints.maxLength;

    const match: string[] = name.match(/[A-Za-z0-9]*/);
    if (match && match[0] !== name) {
      valid = false;
    }

    return valid;
  }

}
