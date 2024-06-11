import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rule1Component } from './rule1.component';

describe('Rule1Component', () => {
  let component: Rule1Component;
  let fixture: ComponentFixture<Rule1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Rule1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Rule1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
