import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradsListComponent } from './grads-list.component';

describe('GradsListComponent', () => {
  let component: GradsListComponent;
  let fixture: ComponentFixture<GradsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
