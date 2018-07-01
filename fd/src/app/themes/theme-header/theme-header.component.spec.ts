import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeHeaderComponent } from './theme-header.component';

describe('ThemeHeaderComponent', () => {
  let component: ThemeHeaderComponent;
  let fixture: ComponentFixture<ThemeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
