import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categorycomponent } from './categorycomponent';

describe('Categorycomponent', () => {
  let component: Categorycomponent;
  let fixture: ComponentFixture<Categorycomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categorycomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categorycomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
