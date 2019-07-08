import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvUnitComponent } from './conv-unit.component';

describe('ConvUnitComponent', () => {
  let component: ConvUnitComponent;
  let fixture: ComponentFixture<ConvUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
