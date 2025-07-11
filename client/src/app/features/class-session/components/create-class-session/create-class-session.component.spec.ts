import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassSessionComponent } from './create-class-session.component';

describe('CreateClassSessionComponent', () => {
  let component: CreateClassSessionComponent;
  let fixture: ComponentFixture<CreateClassSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateClassSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClassSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
