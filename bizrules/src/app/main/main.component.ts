import { Component } from '@angular/core';
import { RuleCreationPopupComponent } from '../rule-creation-popup/rule-creation-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { SavedrulesService } from '../savedrules.service';
// import { Rule1Component } from '../rule1/rule1.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private dialog: MatDialog ,public savedrulesService: SavedrulesService) {}

selectedRuleType=""
 selectedQueue=""
  queue_list=this.savedrulesService.queues_list
 rule_types=this.savedrulesService.rule_type_list
 saved_rules:any=[]
createrulediv:boolean=false
selectedInterfaceStates=[]

  closecreateDiv():void{
    this.createrulediv=false
  }

  createRuleDiv(): void {
    const dialogRef = this.dialog.open(RuleCreationPopupComponent, {
      width: '1000px',
      height: 'auto', 
      minHeight: '400px',
      maxHeight: '550px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog-container' 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result here if needed
    });
  }

  onRuleSelectionChange(value: any): void {
    const savedRules = this.savedrulesService.savedRules;
    if (
      savedRules &&
      savedRules[this.selectedQueue] &&
      savedRules[this.selectedQueue][this.selectedRuleType]
    ) {
      this.createrulediv = true;
      this.selectedInterfaceStates = savedRules[this.selectedQueue][this.selectedRuleType][value];
    }
    const dialogRef = this.dialog.open(RuleCreationPopupComponent, {
      width: '1000px',
      height: 'auto', 
      minHeight: '400px',
      maxHeight: '550px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog-container' ,
      data: { interfaceStates: this.selectedInterfaceStates ,
        isPopup:false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result here if needed
    });
  }

  onRuleTypeSelectionChange(): void {
    const savedRules = this.savedrulesService.savedRules;
    if (
      savedRules &&
      savedRules[this.selectedQueue] &&
      savedRules[this.selectedQueue][this.selectedRuleType]
    ) {
      this.saved_rules = Object.keys(savedRules[this.selectedQueue][this.selectedRuleType]);
    } else {
      this.saved_rules = [];
    }
    console.log(savedRules)
  }
}
