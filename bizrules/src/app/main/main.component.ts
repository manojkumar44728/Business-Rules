import { Component } from '@angular/core';
import { RuleCreationPopupComponent } from '../rule-creation-popup/rule-creation-popup.component';
import { MatDialog } from '@angular/material/dialog';
// import { Rule1Component } from '../rule1/rule1.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private dialog: MatDialog) {}

 showDiv: boolean = false;
  flag=true
  selectedLogicOption: string = '';

  // toggleDiv() {
  //   this.showDiv = !this.showDiv;
  //   this.flag=!this.flag;
  //   this.selectedLogicOption="";
  // }
  queue_list=["Maker","Duplicate","Checker"]
 rule_type=["UI Rules","Backend Rules"]
 saved_rules=["rule_id_1","rule_id_2","rule_id_3","rule_id_4"]
  
ruleDiv=false;
createrulediv:boolean=false
  openRuleDiv(): void {
    console.log('openrulediv')
    this.ruleDiv = true;
  }
 
  closeRuleDiv(): void {
    this.ruleDiv = false;
    
  }

  closecreateDiv():void{
    this.createrulediv=false
  }
  createRuleDiv(): void {
    const dialogRef = this.dialog.open(RuleCreationPopupComponent, {
      width: '1000px',
      height: 'auto', 
      minHeight:'400px',
      maxHeight:'550px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog-container' 
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result here if needed
    });
  }
  rule2: boolean = false;
  rule1:boolean=false;
  onRuleSelectionChange(value:any):void {
    if (value === "rule_id_1") {
      this.rule1=true;
      this.rule2 = false;
    } 
    else if(value === "rule_id_2"){
      this.rule2 = true;
      this.rule1=false;

    }

  }
}
