import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TributeSearchComponent } from './tribute-search.component';

describe('TributeSearchComponent', () => {
  let component: TributeSearchComponent;
  let fixture: ComponentFixture<TributeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TributeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TributeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
