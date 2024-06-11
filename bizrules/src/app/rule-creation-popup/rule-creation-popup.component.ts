
import { Component,AfterViewInit, ElementRef, OnInit, ViewChild ,TemplateRef} from '@angular/core';
import { CdkDragStart, CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DialogRef } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { SavedrulesService } from '../savedrules.service';

@Component({
  selector: 'app-rule-creation-popup',
  templateUrl: './rule-creation-popup.component.html',
  styleUrls: ['./rule-creation-popup.component.scss']
})
export class RuleCreationPopupComponent implements AfterViewInit {
  @ViewChild('ifButton') ifButton!: ElementRef;
  @ViewChild('plusButton') plusButton!: ElementRef;
  @ViewChild('lineElement') lineElement!: ElementRef;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  private templateDialogRef?: MatDialogRef<any>;
  ngAfterViewInit() {
    this.drawLine();
  }
  constructor( public dialogRef: MatDialogRef<RuleCreationPopupComponent>,private savedrulesService:SavedrulesService,private dialog: MatDialog) {}
  
  functionFilterCtrl = new FormControl();
  logicOptions: string[] = ['Loop','If','Variable','Set'];
  logicOptionsForPlus: string[] = ['Loop','If','Variable','Set','Elif'];
  loopOptions: string[] = ['No of Times', 'Until', 'Item in List'];
  selectedLogicOption: string = '';
  selectedLoopOption: string = '';
  var1: string = '';
  var2: string = '';
  selectedOperator: string = '';
  functionOptions: string[] = ['Compare', 'Hide', 'Show','doAssign','doRegex'];
  selectedFunction: string = '';
  operators: string[] = ['==', '!=', '>', '<', '>=', '<='];
  code=""
  variableControl = new FormControl();
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  filteredOptions!: Observable<string[]>;
  filteredFunctionOptions!: Observable<string[]>;
  selectedfunctionoption="";
  showLogicDropdown = false;
  saved_rules:any;
  ngOnInit(): void {
    this.filteredFunctionOptions = this.functionFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterFunctions(value))
      );
      this.filteredOptions = this.variableControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.saved_rules=this.savedrulesService.getAllRules()

  }
  private _filterFunctions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.functionOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  onOperatorChange(event: any) {
    this.selectedOperator = event.target.value;
  }
  
 
  interfaceStates: any[] = [];
 
  // addInterface(type: any, index: number,depth:number) {
  //   const newInterface = { type: type,depth:depth };
  //   this.interfaceStates.splice(index, 0, newInterface);
  // }
  addInterface(type: any, index: number, depth: number) {
    let newInterface: any = { type: type, depth: depth };
    
    if (type === 'If' || type ==='Elif') {
      newInterface = { ...newInterface, var1: '', var2: '', operator: '',condition:''};
    } else if (type === 'Variable' ||type === 'Then' ||type === 'Else') {
      newInterface = { ...newInterface, variableName: '', function: '' };
    }
    else if (type === 'andOr') {
      newInterface = { ...newInterface, var1: '', var2: '', operator: '',condition:'' };
    }
    else if(type ==='Set'){
      newInterface = { ...newInterface, var: '',function:'' };

    }
    else if(type ==='Loop'){
      newInterface = { ...newInterface,function:'' };

    }
    
    this.interfaceStates.splice(index, 0, newInterface);
  }
  removeInterface(state:any){
    const index = this.interfaceStates.indexOf(state);

      if(state.type==='If'){
      this.interfaceStates.splice(index,1)
      this.interfaceStates.splice(index,1)
      this.interfaceStates.splice(index,1)
      console.log("states",this.interfaceStates,index)
    }
    if(state.type==='Elif'){
      this.interfaceStates.splice(index,1)
      // this.addInterface('Then',index)
    }
    if(state.type==='For'){
      this.interfaceStates.splice(index,1)
      this.addInterface('Then',index,index)
    }
    if(state.type==='While'){
      this.interfaceStates.splice(index,1)
      this.addInterface('Then',index,index)
    }
    if(state.type==='Else'){
      this.interfaceStates.splice(index,1)

    }
  }
 
  onLogicOptionChange(selectedLogicOption: any) {
    if(selectedLogicOption=='If'){
    this.addInterface('If', this.interfaceStates.length,0);
 
    this.addInterface('Then', this.interfaceStates.length,2);
    this.addInterface('Else',this.interfaceStates.length,0)
    // this.addInterface('Then',this.interfaceStates.length,2);
   
    }
    if(selectedLogicOption=='Variable'){
    this.addInterface('Variable',this.interfaceStates.length,0)
    }
    if(selectedLogicOption=='Loop'){
      this.addInterface('Loop', this.interfaceStates.length,0);
      }
      if(selectedLogicOption=='Set'){
        this.addInterface('Set',this.interfaceStates.length,0);
      // this.addInterface('Then',this.interfaceStates.length,2);
   
        }
 
  }
  space=0
  onFunctionChange(selectedFunction: any, state: any) {
    const index = this.interfaceStates.indexOf(state);
    this.space=index
    if(selectedFunction==='For'){
    this.interfaceStates.splice(index,1);
      this.addInterface('For',index,index)
      this.addInterface('Then',index+1,index+1)
    }
    else if(selectedFunction==='While'){
    this.interfaceStates.splice(index,1);
      this.addInterface('While',index,index)
      this.addInterface('Then',index+1,index+1)
    }
    else if(selectedFunction==='If'){
    this.interfaceStates.splice(index+1,1);
      this.addInterface('If',index+1,index)
      this.addInterface('Then',index+2,index+2)
      this.addInterface('Else',index+3,index)
      // this.addInterface('Then',index+3,index+2)
 
    }
    else if(selectedFunction==='Elif'){
    // this.interfaceStates.splice(index,1);
      this.addInterface('Elif',index+1,index-1)
      this.addInterface('Then',index+2,index)
    }
    // else if (selectedFunction === 'Decline') {
    //   this.removeInterface(this.interfaceStates[index-1]["type"],index-1)
    //   // if (index !== -1) {
    //   //   this.interfaceStates.splice(index-1,1);
    //   //   if(this.interfaceStates.length>0){
    //   //     console.log(this.interfaceStates,index,state)
    //   //   this.addInterface('Then',index-1)
    //   //   // if(this.interfaceStates[index]==='Else'){
    //   //   //   this.interfaceStates.splice(0,this.interfaceStates.length)
    //   //   // }
    //   //   }
    //   // }
    // }
    else {
      // For other functions, just update the function property of the state
      this.interfaceStates[index].function = selectedFunction;
  }
  console.log(this.interfaceStates)
  this.showLogicDropdown = false;
  }
  onDragStarted(event: CdkDragStart) {
    // Handle drag start event
  }
  
  onDragMoved(event: CdkDragMove) {
    // Handle drag move event
  }
  
  onDragEnded(event: CdkDragEnd) {
    // Handle drag end event
  }
  onClose(): void {
    this.dialogRef.close();
  }
 Close(): void {
    if (this.templateDialogRef) {
      this.templateDialogRef.close(); // Close only the dialog container
    }
  }
  activeButton: string = '';

  setActiveButton(button: string,state: any) {
    const index = this.interfaceStates.indexOf(state);
    console.log(state,index)
    this.activeButton = button;
    if(state.condition===''){
      this.addInterface('andOr',index+1,index)
      this.interfaceStates[index].condition = button;
    }
    else{
      this.interfaceStates[index].condition = button;
    }
    
  }
  private drawLine() {
    const ifButtonRect = this.ifButton.nativeElement.getBoundingClientRect();
    const plusButtonRect = this.plusButton.nativeElement.getBoundingClientRect();

    const x1 = ifButtonRect.right;
    const y1 = ifButtonRect.top + (ifButtonRect.height / 2);
    const x2 = plusButtonRect.left;
    const y2 = plusButtonRect.top + (plusButtonRect.height / 2);

    this.lineElement.nativeElement.setAttribute('x1', x1);
    this.lineElement.nativeElement.setAttribute('y1', y1);
    this.lineElement.nativeElement.setAttribute('x2', x2);
    this.lineElement.nativeElement.setAttribute('y2', y2);
  }
  generatePythonCode(): string {
    let pythonCode = '';
    this.interfaceStates.forEach(state => {
      if (state.type === 'Variable') {
        pythonCode += `${state.variableName} = ${state.function}\n`;
      } else if (state.type === 'If') {
        pythonCode += `if ${state.var1} ${state.operator} ${state.var2} ${state.condition} :\n`;
      } else if (state.type === 'andOr'){
        pythonCode=pythonCode.slice(0,-2)
        pythonCode += `${state.var1} ${state.operator} ${state.var2} ${state.condition} :\n`
      }else if (state.type === 'While') {
        pythonCode += `while ${state.var1} ${state.operator} ${state.var2}:\n`;
      } else if (state.type === 'For') {
        pythonCode += `for ${state.var1} in range(${state.rangeStart}, ${state.rangeEnd}):\n`;
      } else if (state.type === 'Then') {
        pythonCode += `    ${state.function}()\n`;
      } else if (state.type === 'Else') {
        pythonCode += `else:\n    ${state.function}()\n`;
      } else if(state.type === 'Set'){
        pythonCode += `${state.var}=${state.function}()\n`
      }
    });
    return pythonCode;
  }
  generatedCode: string = '';
  isCodeModalVisible: boolean = false;

  showCodeModal(): void {
    this.isCodeModalVisible = !this.isCodeModalVisible
    if(this.isCodeModalVisible){
      this.generatedCode = this.generatePythonCode();

    }
  }

  hideCodeModal(): void {
    this.isCodeModalVisible = false;
  }

  toggleLogicDropdown() {
    this.showLogicDropdown = !this.showLogicDropdown;
    console.log(this.showLogicDropdown)
  }

  selectLogicOption(option: string) {
    this.selectedLogicOption = option;
    this.showLogicDropdown = false;
    console.log(this.showLogicDropdown);
  }
  // saveRule(interfaceStates:any): void {
  //     const ruleId = 'rule_id_1'; // You can dynamically set this based on user input or other criteria
  //     this.savedrulesService.addRule(ruleId, this.interfaceStates);
  //     console.log(this.interfaceStates);
  //     this.dialogRef.close(); // Close the dialog after saving the rule
  //   }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(
  //     this.dialogTemplate, // Use the TemplateRef as dialog content
  //     {
  //       width: '250px'
  //     }
  //   );

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Handle the result here if needed
  //       console.log('Dialog closed with result:', result);
  //       // Add the result (new rule ID) to your saved rules array if needed
  //     }
  //   });
  // }

  // saveNewRule(newRuleId:any,interfaceStates:any): void {
  //   if (newRuleId.trim()) {
  //     this.savedrulesService.addRule(newRuleId,interfaceStates)
  //     this.dialogRef.close(newRuleId);
  //   } else {
  //     // Handle validation or empty input case
  //     console.log('Please enter a valid Rule ID');
  //   }
  // }

 openDialog(): void {
    if (!this.templateDialogRef) {
      this.templateDialogRef = this.dialog.open(this.dialogTemplate, {
        width: '250px'
      });
 
      this.templateDialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Handle the result here if needed
          console.log('Dialog closed with result:', result);
          // Add the result (new rule ID) to your saved rules array if needed
        }
        // Reset the templateDialogRef to null after dialog is closed
        this.templateDialogRef = undefined;
       
      });
    }
  }
 
  saveNewRule(newRuleId: any, interfaceStates: any): void {
    if (newRuleId.trim()) {
      this.savedrulesService.addRule(newRuleId, interfaceStates);
      this.templateDialogRef?.close(newRuleId);
      this.dialogRef.close();
     
    } else {
      console.log('Please enter a valid Rule ID');
    }
  }
  
    onRuleSelectionChange(rule_id: any): void {
      this.interfaceStates=this.savedrulesService.savedRules[rule_id]
    }

  variables = ['varA', 'varB', 'varC'];
  addVariable(variableType: string, index: number, event: any) {
    const newVariable = event.target.value.trim();
    if (newVariable && !this.variables.includes(newVariable)) {
      this.variables.push(newVariable); // Add new variable to the list if it's not already there
      this.interfaceStates[index][variableType] = newVariable; // Update the corresponding variable in interfaceStates
      event.target.value = ''; // Clear the input field after adding the variable

      // Set the selected value in mat-select to the newly added variable
      this.interfaceStates[index][variableType] = newVariable;
    }
  }

  onVariableChange(event: any, variableType: string, index: number) {
    // if (event.value === 'new') {
    //   this.interfaceStates[index][variableType] = ''; // Clear the variable in interfaceStates if "new" is selected
    // }
  }
}
 