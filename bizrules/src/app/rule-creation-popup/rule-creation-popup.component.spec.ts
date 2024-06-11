import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleCreationPopupComponent } from './rule-creation-popup.component';

describe('RuleCreationPopupComponent', () => {
  let component: RuleCreationPopupComponent;
  let fixture: ComponentFixture<RuleCreationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuleCreationPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuleCreationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
