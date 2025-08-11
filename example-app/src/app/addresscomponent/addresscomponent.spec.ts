import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addresscomponent } from './addresscomponent';

describe('Addresscomponent', () => {
  let component: Addresscomponent;
  let fixture: ComponentFixture<Addresscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addresscomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addresscomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
