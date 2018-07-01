import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TributeCreateComponent } from './tribute-create.component';

describe('TributeCreateComponent', () => {
  let component: TributeCreateComponent;
  let fixture: ComponentFixture<TributeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TributeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TributeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
