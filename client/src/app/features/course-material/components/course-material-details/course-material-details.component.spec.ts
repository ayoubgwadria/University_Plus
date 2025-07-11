import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMaterialDetailsComponent } from './course-material-details.component';

describe('CourseMaterialDetailsComponent', () => {
  let component: CourseMaterialDetailsComponent;
  let fixture: ComponentFixture<CourseMaterialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseMaterialDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseMaterialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
