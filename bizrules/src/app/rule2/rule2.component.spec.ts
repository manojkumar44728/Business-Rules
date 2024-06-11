import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rule2Component } from './rule2.component';

describe('Rule2Component', () => {
  let component: Rule2Component;
  let fixture: ComponentFixture<Rule2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Rule2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Rule2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
