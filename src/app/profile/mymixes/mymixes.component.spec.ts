import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MymixesComponent } from './mymixes.component';

describe('MymixesComponent', () => {
  let component: MymixesComponent;
  let fixture: ComponentFixture<MymixesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymixesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MymixesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
