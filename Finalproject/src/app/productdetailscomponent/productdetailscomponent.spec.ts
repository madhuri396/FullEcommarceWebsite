import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productdetailscomponent } from './productdetailscomponent';

describe('Productdetailscomponent', () => {
  let component: Productdetailscomponent;
  let fixture: ComponentFixture<Productdetailscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productdetailscomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productdetailscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
