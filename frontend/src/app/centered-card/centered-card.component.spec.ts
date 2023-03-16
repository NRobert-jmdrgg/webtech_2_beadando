import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteredCardComponent } from './centered-card.component';

describe('CenteredCardComponent', () => {
  let component: CenteredCardComponent;
  let fixture: ComponentFixture<CenteredCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenteredCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenteredCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
