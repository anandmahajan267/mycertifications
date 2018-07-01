import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsFooterComponent } from './cms-footer.component';

describe('CmsFooterComponent', () => {
  let component: CmsFooterComponent;
  let fixture: ComponentFixture<CmsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
