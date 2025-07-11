import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicCalendarDetailsComponent } from './academic-calendar-details.component';

describe('AcademicCalendarDetailsComponent', () => {
  let component: AcademicCalendarDetailsComponent;
  let fixture: ComponentFixture<AcademicCalendarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcademicCalendarDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicCalendarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
