import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmixesComponent } from './viewmixes.component';

describe('ViewmixesComponent', () => {
  let component: ViewmixesComponent;
  let fixture: ComponentFixture<ViewmixesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmixesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmixesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
