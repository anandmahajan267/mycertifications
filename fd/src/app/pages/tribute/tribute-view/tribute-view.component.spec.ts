import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TributeViewComponent } from './tribute-view.component';

describe('TributeViewComponent', () => {
  let component: TributeViewComponent;
  let fixture: ComponentFixture<TributeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TributeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TributeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
