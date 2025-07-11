import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSessionDetailsComponent } from './class-session-details.component';

describe('ClassSessionDetailsComponent', () => {
  let component: ClassSessionDetailsComponent;
  let fixture: ComponentFixture<ClassSessionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassSessionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassSessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
