import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PaginationService} from '../services/pagination-service';

@Component({
  selector: 'app-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  currentDate: Date;

  constructor(private paginationService: PaginationService) {
  }

  ngOnInit(): void {
    this.paginationService.date$.subscribe((da) => {
      this.currentDate = da;
    });
  }

  decreaseDate(): void {
    this.paginationService.changeDate(new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1)));
  }

  increaseDate(): void {
    const d = this.paginationService.date$;
    this.paginationService.changeDate(new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1)));
  }



}
