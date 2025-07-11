import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSessionsListComponent } from './class-sessions-list.component';

describe('ClassSessionsListComponent', () => {
  let component: ClassSessionsListComponent;
  let fixture: ComponentFixture<ClassSessionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassSessionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassSessionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
