import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSingleInfoComponent } from './card-single-info.component';

describe('CardSingleInfoComponent', () => {
  let component: CardSingleInfoComponent;
  let fixture: ComponentFixture<CardSingleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSingleInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSingleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
