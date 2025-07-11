import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMaterialsListComponent } from './course-materials-list.component';

describe('CourseMaterialsListComponent', () => {
  let component: CourseMaterialsListComponent;
  let fixture: ComponentFixture<CourseMaterialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseMaterialsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseMaterialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
