import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, NgForm} from '@angular/forms';
import {CalendarService} from '../services/calendar-service';
import {DevopsDataDto} from '../domain/devops-data';
import {PaginationService} from '../services/pagination-service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit, OnDestroy {

  constructor(private modalService: NgbModal,
              private calendarService: CalendarService,
              private paginationService: PaginationService,
              private notificationService: NotificationsService) {
  }


  ngOnInit(): void {
    this.paginationService.dateSubject$.subscribe((d) => {
      if (d != null) {
        this.paginationService.setDate(d);
        this.getData(d);
      }
    });
    const date = new Date();
    this.paginationService.setDate(date);
    this.getData(date);
  }

  @ViewChild('f') signupForm: NgForm;

  primary: string;
  secondary: string;
  primaryEffort: number;
  secondaryEffort: number;
  primaryEmail: string;
  secondaryEmail: string;
  comments: string;
  closeResult = '';
  monthlyDevopsData: [[DevopsDataDto]];

  open(content, tdData) {
    this.primary = tdData.devopsData ? tdData.devopsData.primaryDevops : '';
    this.secondary = tdData.devopsData ? tdData.devopsData.secondaryDevops : '';
    this.primaryEmail = tdData.devopsData ? tdData.devopsData.primaryEmail : '';
    this.secondaryEmail = tdData.devopsData ? tdData.devopsData.secondaryEmail : '';
    this.primaryEffort = tdData.devopsData ? tdData.devopsData.primaryEffort : '';
    this.secondaryEffort = tdData.devopsData ? tdData.devopsData.secondaryEffort : '';
    this.comments = tdData.devopsData ? tdData.devopsData.comments : '';
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.result.then((result) => {
      if (tdData.devopsData) {
        tdData.devopsData.primaryDevops = this.primary;
        tdData.devopsData.secondaryDevops = this.secondary;
        tdData.devopsData.primaryEmail = this.primaryEmail;
        tdData.devopsData.secondaryEmail = this.secondaryEmail;
        tdData.devopsData.primaryEffort = this.primaryEffort;
        tdData.devopsData.secondaryEffort = this.secondaryEffort;
        tdData.devopsData.comments = this.comments;
      } else if (this.primary) {
        tdData.devopsData = {
          primaryDevops: this.primary,
          secondaryDevops: this.secondary,
          primaryEmail: this.primaryEmail,
          secondaryEmail: this.secondaryEmail,
          primaryEffort: this.primaryEffort,
          secondaryEffort: this.secondaryEffort,
          comments: this.comments
        };
      }
      if (tdData.devopsData) {
        this.saveData(tdData);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      if (reason === 'delete') {
        this.deletData(tdData);
      }
      this.closeResult =
        `Dismissed ${this.getDismissReason(reason)}`;
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

  ngOnDestroy(): void {
    console.log('destroy')
    //this.paginationService.dateSubject$.unsubscribe();
  }

  getData(date: Date): void {
    this.calendarService.getCalendarData(date.getMonth() + 1, date.getUTCFullYear())
      .subscribe((data) => {
        this.monthlyDevopsData = data;
      });
  }


  saveData(devopsDataDto: DevopsDataDto): void {
    this.calendarService.save(devopsDataDto).subscribe(() => {
      this.notificationService.success('', 'Data Saved Successfully',{
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    });
  }

  private deletData(tdData: any): void {
    tdData.devopsData = null;
    this.calendarService.deleteData(tdData).subscribe(() => {
      this.notificationService.info('', 'Data Deleted Successfully ',{
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
    });
  }

  primaryUsers = ['user-1','user-2'];

  getUsernames(item: any) {
    return 'this is ' + item;

  }
}
