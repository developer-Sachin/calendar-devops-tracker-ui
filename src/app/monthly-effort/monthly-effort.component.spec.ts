import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEffortComponent } from './monthly-effort.component';

describe('MonthlyEffortComponent', () => {
  let component: MonthlyEffortComponent;
  let fixture: ComponentFixture<MonthlyEffortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyEffortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
