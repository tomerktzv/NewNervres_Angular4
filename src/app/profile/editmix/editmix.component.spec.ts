import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmixComponent } from './editmix.component';

describe('EditmixComponent', () => {
  let component: EditmixComponent;
  let fixture: ComponentFixture<EditmixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
