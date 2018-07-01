import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeTwoComponent } from './theme-two.component';

describe('ThemeTwoComponent', () => {
  let component: ThemeTwoComponent;
  let fixture: ComponentFixture<ThemeTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
