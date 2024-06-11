import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bizrules';
  showDiv: boolean = false;
  flag=true

  toggleDiv() {
    this.showDiv = !this.showDiv;
    this.flag=!this.flag;
    this.selectedLogicOption="";
  }
  logicOptions: string[] = ['If', 'If-Else', 'If-Elif-Else'];
  loopOptions: string[] = ['No Times', 'Until', 'Item in List'];
  selectedLogicOption: string = '';
  selectedLoopOption: string = '';
  var1: string = '';
  var2: string = '';
  selectedOperator: string = '';
  functionOptions: string[] = ['Compare', 'Hide', 'Show'];
  selectedFunction: string = '';
  operators: string[] = ['==', '!=', '>', '<', '>=', '<='];
  showDeleteButton: { logic: boolean, else: boolean, loop: boolean, elif: boolean } = { logic: false, else: false, loop: false, elif: false };
  showVariableInput: boolean = false;
  variableName: string = '';
  selectedVariableFunction: string = '';
  
  // Counter for variable button clicks
  variableButtonClickCount: number = 0;
  onLogicOptionChange(event: any) {
    this.selectedLogicOption = event.target.value;
  }
 
  onLoopOptionChange(event: any) {
    this.selectedLoopOption = event.target.value;
  }
 
  onOperatorChange(event: any) {
    this.selectedOperator = event.target.value;
  }
 
  onFunctionChange(event: any) {
    this.selectedFunction = event.target.value;
  }
 
  removeInterface(type: string) {
    switch(type) {
      case 'logic':
        this.selectedLogicOption = '';
        this.var1 = '';
        this.var2 = '';
        this.selectedOperator = '';
        this.showDeleteButton.logic = false;
        break;
      case 'else':
        // Logic for removing the else interface
        this.showDeleteButton.else = false;
        break;
        case 'elif':
        // Logic for removing the else interface
        this.showDeleteButton.elif = false;
        break;
      case 'loop':
        this.selectedLoopOption = '';
        this.showDeleteButton.loop = false;
        break;
      default:
        break;
    }
  }
 queue_list=["Maker","Duplicate","Checker"]
 rule_type=["UI Rules","Backend Rules"]
 saved_rules=["rule_id_1","rule_id_2","rule_id_3","rule_id_4"]

 toggleVariableInput() {
  this.variableButtonClickCount++;
}
}
 


