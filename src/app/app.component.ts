import {Component} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './services/user-service';
import {User} from './domain/user';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendar-demo';

  closeResult = '';

  userName: string;
  firstName: string;
  lastName: string;
  emailId: string;

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private notificationService: NotificationsService) {
  }

  open(content) {
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.result.then((result) => {
      this.saveUser();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveUser(): void {
    const user: User = {
      userName: this.userName,
      firstName: this.firstName,
      lastName: this.lastName,
      emailId: this.emailId
    };

    this.userService.addUser(user).subscribe(() => {
      this.notificationService.success('', 'User Added Successfully ', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
    }, () => {
      this.notificationService.error('', 'Error Occurred', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
    });
  }

}
