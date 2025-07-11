import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicCalendarsListComponent } from './academic-calendars-list.component';

describe('AcademicCalendarsListComponent', () => {
  let component: AcademicCalendarsListComponent;
  let fixture: ComponentFixture<AcademicCalendarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcademicCalendarsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicCalendarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
