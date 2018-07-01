import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationVerificationErrorComponent } from './registration-verification-error.component';

describe('RegistrationVerificationErrorComponent', () => {
  let component: RegistrationVerificationErrorComponent;
  let fixture: ComponentFixture<RegistrationVerificationErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationVerificationErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationVerificationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
