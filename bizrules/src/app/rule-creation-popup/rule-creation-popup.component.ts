
import { Component, AfterViewInit, ElementRef, OnInit, ViewChild, TemplateRef, Input, Inject } from '@angular/core';
import { CdkDragStart, CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { SavedrulesService } from '../savedrules.service';
import { networkInterfaces } from 'os';
import { string } from 'blockly/core/utils';

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
  interfaceStates: any[] = [];
  isPopup: boolean = true;
  private templateDialogRef?: MatDialogRef<any>;
  state: any;
  ngAfterViewInit() {
  }

  constructor(public dialogRef: MatDialogRef<RuleCreationPopupComponent>,
    public savedrulesService: SavedrulesService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.interfaceStates) {
      this.interfaceStates = this.interfaceStates = JSON.parse(JSON.stringify(data.interfaceStates)),
        this.isPopup = data.isPopup
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  functionFilterCtrl = new FormControl();
  logicOptions: string[] = ['Loop', 'If', 'Variable', 'Set', 'doSomething'];
  logicOptionsForPlus: string[] = ['Loop', 'If', 'Variable', 'Set', 'Elif', 'Print', 'doSomething','andOr'];
  loopOptions: string[] = ['No of Times', 'Until', 'Item in List'];
  selectedLogicOption: string = '';
  selectedLoopOption: string = '';
  var1: string = '';
  var2: string = '';
  selectedOperator: string = '';
  functionOptions: string[] = [];
  selectedFunction: string = '';
  operators: string[] = ['==', '!=', '>', '<', '>=', '<=','-','+','x','%','^'];
  code = ""
  variableControl = new FormControl();
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  filteredOptions!: Observable<string[]>;
  filteredFunctionOptions!: Observable<string[]>;
  selectedfunctionoption = "";
  showLogicDropdown = false;
  queue_list = this.savedrulesService.queues_list
  rule_types = this.savedrulesService.rule_type_list
  ui_functions = this.savedrulesService.functionNames
  fetch_options = this.savedrulesService.fetchvalue
  inputValues: { [key: string]: string } = {};
  fetchValue: string = '';

  selectedRuleType = ""
  savedRuleType=""
  selectedQueue = ""
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
    // this.generateId(3, 4)
    // this.getFunctionValues(functionName);
    this.state.function.forEach((key: any) => {
      this.inputValues[key] = '';
    });


  }

  getFunctionValues(functionName: any) {
    let functionspair:any
    if(this.selectedRuleType==="Backend Rules"){
      functionspair = this.savedrulesService.backend_functions
    }
    else{
      functionspair = this.savedrulesService.functionKeys
    }  
    this.logInputValues()
    return functionspair[functionName];
  }
  logInputValues(): string[] {
    const values = [];
    for (const [key, value] of Object.entries(this.inputValues)) {
      console.log(`${key}: ${value}`);
      values.push(value);
    }
    console.log(values)
    return values;
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



  // addInterface(type: any, index: number,depth:number) {
  //   const newInterface = { type: type,depth:depth };
  //   this.interfaceStates.splice(index, 0, newInterface);
  // }
  addInterface(type: any, index: number, depth: number) {
    let newInterface: any = { type: type, depth: depth };

    if (type === 'If' || type === 'Elif') {
      newInterface = { ...newInterface, var1: '', var2: '', operator: '', internalCondition: '', externalCondition: '' };
      // console.log(type, 'type', depth, 'depth')
    }
    else if (type === 'Variable' || type === 'Then' || type === 'Else') {
      newInterface = { ...newInterface, variableName: '', function: '' };

    }
    else if (type === 'Function') {
      newInterface = { ...newInterface, variableName: '', function: '' };

    }
    else if (type === 'FetchValue') {
      newInterface = { ...newInterface };

    }
    else if (type === 'andOr') {
      newInterface = { ...newInterface, var1: '', var2: '', operator: '', internalCondition: '', externalCondition: '' };
    }
    else if (type === 'Set') {
      newInterface = { ...newInterface, var: '', function: '' };

    }
    else if (type === 'doSomething') {
      newInterface = { ...newInterface, var1: '', var2: '', operator: '' };
    }
    else if (type === 'Loop') {
      newInterface = { ...newInterface, function: '', var: 'i', list: [''] };

    }
    else if (type === 'Print') {
      newInterface = { ...newInterface, var: '' };

    }


    this.interfaceStates.splice(index, 0, newInterface);
  }
  findNextParentIndex(index: number, depth: number,) {
    let nextParentIndex = index;
    for (let i = index + 1; i < this.interfaceStates.length; i++) {
      if (this.interfaceStates[i].depth <= depth) {
        nextParentIndex = i;
        break;
      }
    }
    //if the dont have nextParent 
    if (index === nextParentIndex) {
      nextParentIndex = this.interfaceStates.length
    }

    return nextParentIndex
  }
  removeInterface(state: any) {
    const currentIndex = this.interfaceStates.indexOf(state);
    const currentDepth = state.depth;
    let nextParentIndex = currentIndex;
    //if deletion
    if (state.type === 'If') {
      for (let i = currentIndex + 1; i < this.interfaceStates.length; i++) {
        if (this.interfaceStates[i].depth === currentDepth) {
          if (this.interfaceStates[i].type !== 'Else' && this.interfaceStates[i].type !== 'Then' && this.interfaceStates[i].type !== 'andOr') {
            nextParentIndex = i
            break;
          }
        }
      }

      if (nextParentIndex === currentIndex) {
        nextParentIndex = this.interfaceStates.length
      }
      this.interfaceStates.splice(currentIndex, nextParentIndex - currentIndex)
      // console.log("currentindex:", currentIndex)
      // console.log("nextParentIndex:", nextParentIndex)
      // console.log("no of states to be deleted:", nextParentIndex - currentIndex)
    }

    //else deletion
    else if (state.type === 'Else') {
      nextParentIndex = this.findNextParentIndex(currentIndex, currentDepth)
      this.interfaceStates.splice(currentIndex, nextParentIndex - currentIndex)
      // console.log("no of states to be deleted:", nextParentIndex - currentIndex)
    }

    //loop deletion
    else if (state.type === 'Loop') {
      let nextThenIndex = currentIndex
      for (let i = currentIndex + 1; i < this.interfaceStates.length; i++) {
        //find the corresponding then index
        if (this.interfaceStates[i].type === 'Then') {
          if (this.interfaceStates[i].depth === currentDepth)
            nextThenIndex = i;
        }
      }
      nextParentIndex = this.findNextParentIndex(nextThenIndex, currentDepth)
      this.interfaceStates.splice(currentIndex, nextParentIndex - currentIndex)

    }

    //set deletion
    else if (state.type === 'Set') {
      this.interfaceStates.splice(currentIndex, 1)
    }
  }

  onLogicOptionChange(selectedLogicOption: any) {
    if (selectedLogicOption == 'If') {
      this.addInterface('If', this.interfaceStates.length, 0);

      this.addInterface('Then', this.interfaceStates.length, 0);
      this.addInterface('Else', this.interfaceStates.length, 0)
      // this.addInterface('Then',this.interfaceStates.length,2);

    }
    if (selectedLogicOption == 'Variable') {
      this.addInterface('Variable', this.interfaceStates.length, 0)
    }
    if (selectedLogicOption == 'Loop') {
      this.addInterface('Loop', this.interfaceStates.length, 0);
      this.addInterface('Then', this.interfaceStates.length, 0);
    }
    if (selectedLogicOption == 'Set') {
      this.addInterface('Set', this.interfaceStates.length, 0);

    }
    if (selectedLogicOption == 'Print') {
      this.addInterface('Print', this.interfaceStates.length, 0);

    }
    if (selectedLogicOption == 'doSomething') {
      this.addInterface('doSomething', this.interfaceStates.length, 0);
      this.addInterface('Return', this.interfaceStates.length, 0);


    }
    if (selectedLogicOption == 'Function') {
      this.addInterface('Function', this.interfaceStates.length, 0);

    }
    if (selectedLogicOption == 'FetchValue') {
      this.addInterface('FetchValue', this.interfaceStates.length, 0);

    }


  }
  space = 0
  selectedSetoption:any
  onFunctionChange(selectedFunction: any, state: any) {
    this.selectedSetoption=selectedFunction
    const index = this.interfaceStates.indexOf(state);
    const depth = state.depth;
    let nextParentIndex = this.interfaceStates.length;
    for (let i = index + 1; i < this.interfaceStates.length; i++) {
      if (this.interfaceStates[i].depth <= depth) {
        nextParentIndex = i;
        break;
      }
    }
    const addingIndex = nextParentIndex
    if (selectedFunction === 'Loop') {
      this.addInterface('Loop', addingIndex, depth + 1)
      this.addInterface('Then', addingIndex + 1, depth + 1)
    }
    else if (selectedFunction === 'If') {
      this.addInterface('If', addingIndex, depth + 1)
      this.addInterface('Then', addingIndex + 1, depth + 1)
      this.addInterface('Else', addingIndex + 2, depth + 1)

    }
    else if (selectedFunction === 'Elif') {
      this.addInterface('Elif', addingIndex, depth)
      this.addInterface('Then', addingIndex + 1, depth)
    }
    else if (selectedFunction === 'Set') {
      this.addInterface('Set', addingIndex, depth )
      // this.addInterface('andOr', addingIndex, depth+1)

    }
    else if (selectedFunction === 'Print') {
      this.addInterface('Print', addingIndex, depth+1)
    }
    else if (selectedFunction === 'doSomething') {
      this.addInterface('doSomething', addingIndex, depth)
      this.addInterface('Return', addingIndex + 1, depth)

    }
    else if(selectedFunction==='andOr'){
      this.addInterface('andOr', addingIndex, depth)
    }

    else {
      // For other functions, just update the function property of the state
      this.interfaceStates[index].function = selectedFunction;
    }
    // console.log(this.interfaceStates)
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

  setInternalActiveButton(button: string, state: any) {
    const index = this.interfaceStates.indexOf(state);
    // console.log(state, index);
    const depth = state.depth;

    // Check current internalCondition to determine action
    if (state.internalCondition === button) {
      // If the same button is clicked again, remove the 'andOr' interface
      if (this.interfaceStates[index + 1] && this.interfaceStates[index + 1].type === 'andOr') {
        this.interfaceStates.splice(index + 1, 1);
      }
      this.interfaceStates[index].internalCondition = ''; // Reset condition
    } else {
      if (state.internalCondition === '') {
        // Add 'andOr' interface if no condition is set
        this.addInterface('andOr', index + 1, depth);
      }
      // Update the condition to the new button
      this.interfaceStates[index].internalCondition = button;
    }
  }

  setExternalActiveButton(button: string, state: any) {
    const index = this.interfaceStates.indexOf(state);
    // console.log(state, index)
    const depth = state.depth
    if (state.externalCondition === '') {
      this.addInterface('andOr', index + 1, depth)
      this.interfaceStates[index].externalCondition = button;
    }
    else {
      this.interfaceStates[index].externalCondition = button;
    }

  }
  isExternal(state: any) {
    const index = this.interfaceStates.indexOf(state);
    if (this.interfaceStates[index + 1].type !== 'andOr' || this.interfaceStates[index].externalCondition) {
      return true
    }
    return false

  }
  generateCode():string{
    if(this.selectedRuleType==='UI Rules'){
      return this.generateJavascriptCode();
    }
    else{
      return this.generatePythonCode();
    }
  }
  generateJavascriptCode():string{
      let pythonCode = '';
      this.interfaceStates.forEach(state => {
        let indentation = '    '.repeat(state.depth || 0); // Indentation based on state.depth
  
        if (state.type === 'Variable') {
          pythonCode += `${indentation}${state.variableName} = ${state.function}\n`;
        } else if (state.type === 'Set') {
          if(this.selectedRuleType==='UI Rules'){
            pythonCode += `${indentation} var ${state.var};\n `;
          }
          if(state.function==='andOr'){
            pythonCode += `${indentation}${state.var} = `;
          }
          else{
            pythonCode += `${indentation}${state.var} = ${state.function}(${this.logInputValues()})\n`;
  
          }
  
        }
        else if (state.type === 'If') {
          if (state.externalCondition) {
            pythonCode += `${indentation}if ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition} ${state.externalCondition}( :\n`;
          }
          else {
            const var1 = state.var1 ? state.var1 : "''";
            const var2 = state.var2 ? state.var2 : "''";
            pythonCode += `${indentation}if ${var1} ${state.operator} ${var2} ${state.internalCondition}:\n`;
  
          }
        }
        else if (state.type === 'andOr') {
          const index=this.interfaceStates.indexOf(state)
          const previous_state=this.interfaceStates[index-1]
          if(previous_state.type==='If'){
            pythonCode = pythonCode.slice(0, -2); 
  
          }
          else{
            pythonCode = pythonCode;
  
          }
  
          if (state.externalCondition) {
            pythonCode += ` ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}${state.externalCondition} :\n`;
          }
          else if(this.selectedSetoption==='andOr') {
            pythonCode += ` ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}\n`;
          }
          else{
            pythonCode += ` ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}:\n`;
  
          }
        }
        // else if (this.selectedRuleType === 'Backend Rules' && state.type === 'Then' && state.function) {
        //   pythonCode += `${indentation}    ${state.function}()\n`;
        // }
        else if (this.selectedRuleType === 'UI Rules' && state.type === 'Then' && state.function) {
          pythonCode += ` this.${state.function}(${this.logInputValues()});\n`;
        }
  
        // else if (this.selectedRuleType === 'Backend Rules' &&state.type === 'Else') {
        //   pythonCode += `${indentation}else:\n`;
        //   if (state.function) {
        //     pythonCode += `\n${indentation}    ${state.function}()\n`
        //   }
        // } 
        else if (this.selectedRuleType === 'UI Rules' &&state.type === 'Else'  && state.function) {
          pythonCode += `${indentation}else:`;
          if (state.function) {
          pythonCode += `\n${indentation} this.${state.function}(${this.logInputValues()});\n`;
  
          }
        } 
        else if (state.type === 'Elif') {
          pythonCode += `${indentation}elif ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}:\n`;
        } 
        else if (state.type === 'Loop') {
          pythonCode += `${indentation}list = [${state.list}]\n`;
          pythonCode += `${indentation}for ${state.var} in list:\n`;
        }
        else if (state.type === 'Print') {
          pythonCode += `${indentation}print("${state.var}")\n`
        }
        else if (state.type === 'doSomething') {
          pythonCode += `${indentation}def ${state.var}(): \n${indentation}if(${state.var1} ${state.operator} ${state.var2}):\n return ${indentation} ${state.var}() \n`
  
        }
        else if (state.type === 'Function') {
          pythonCode += ` this.${state.function}(${this.logInputValues()});\n`;
        }
        else if (state.type === 'FetchValue') {
          pythonCode += `this.FetchValue(${this.fetchValue},${this.selectedOption});\n`
        }
      });
      return pythonCode;
    
  }
  generatePythonCode(): string {
    let pythonCode = '';
    this.interfaceStates.forEach(state => {
      let indentation = '    '.repeat(state.depth || 0); // Indentation based on state.depth

      if (state.type === 'Variable') {
        pythonCode += `${indentation}${state.variableName} = ${state.function}\n`;
      }
      else if (state.type === 'Set') {
       
          pythonCode += `${indentation}${state.var} = ${state.function}()\n`;

      }
      else if (state.type === 'If') {
        const var1 = state.var1 ? state.var1 : "null";
          const var2 = state.var2 ? state.var2 : "null";
        if (state.externalCondition) {
          pythonCode += `${indentation}if(${var1} ${state.operator} ${var2} ${state.internalCondition})${state.externalCondition}( :\n`;
        }
        else {
          
          pythonCode += `${indentation}if(${var1} ${state.operator} ${var2} ${state.internalCondition}):\n`;

        }
      }
      else if (state.type === 'andOr') {
        pythonCode = pythonCode.slice(0, -3); 
        if (state.externalCondition) {
          pythonCode += ` ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition})${state.externalCondition}( :\n`;
        }
        else{
          pythonCode += ` ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}):\n`;

        }
      }
      else if (this.selectedRuleType === 'Backend Rules' && state.type === 'Then' && state.function) {
        pythonCode += `${indentation}    ${state.function}()\n`;
      }
      // else if (this.selectedRuleType === 'UI Rules' && state.type === 'Then' && state.function) {
      //   pythonCode += ` this.${state.function}(${this.logInputValues()});\n`;
      // }

      else if (this.selectedRuleType === 'Backend Rules' &&state.type === 'Else') {
        pythonCode += `${indentation}else:\n`;
        if (state.function) {
          pythonCode += `\n${indentation}    ${state.function}()\n`
        }
      } 
      // else if (this.selectedRuleType === 'UI Rules' &&state.type === 'Else'  && state.function) {
      //   pythonCode += `${indentation}else:`;
      //   if (state.function) {
      //   pythonCode += `\n${indentation} this.${state.function}(${this.logInputValues()});\n`;

      //   }
      // } 
      else if (state.type === 'Elif') {
        pythonCode += `${indentation}elif ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}:\n`;
      } 
      else if (state.type === 'Loop') {
        pythonCode += `${indentation}list = [${state.list}]\n`;
        pythonCode += `${indentation}for ${state.var} in list:\n`;
      }
      else if (state.type === 'Print') {
        pythonCode += `${indentation}print("${state.var}")\n`
      }
      else if (state.type === 'doSomething') {
        pythonCode += `${indentation}def ${state.var}(): \n${indentation}if(${state.var1} ${state.operator} ${state.var2}):\n return ${indentation} ${state.var}() \n`

      }
      else if (state.type === 'Function') {
        pythonCode += ` this.${state.function}(${this.logInputValues()});\n`;
      }
      else if (state.type === 'FetchValue') {
        pythonCode += `this.FetchValue(${this.fetchValue},${this.selectedOption});\n`
      }
    });
    return pythonCode;
  }
  public inputValue: string = '';

  // Function to update state.var whenever inputValue changes
  updateStateVar(index: number): void {
    const state = this.interfaceStates[index]
    // console.log('states',state)

    state.var = this.inputValue;
    // console.log(state.var,'variable entered')
  }

  generatedCode: string = '';
  isCodeModalVisible: boolean = false;

  showCodeModal(): void {
    this.isCodeModalVisible = !this.isCodeModalVisible
    if (this.isCodeModalVisible) {
      this.generatedCode = this.generateCode();

    }
  }

  hideCodeModal(): void {
    this.isCodeModalVisible = false;
  }

  toggleLogicDropdown() {
    this.showLogicDropdown = !this.showLogicDropdown;
    // console.log(this.showLogicDropdown)
  }

  selectLogicOption(option: string) {
    this.selectedLogicOption = option;
    this.showLogicDropdown = false;
    // console.log(this.showLogicDropdown);
  }

  openDialog(): void {
    if (!this.templateDialogRef) {
      this.templateDialogRef = this.dialog.open(this.dialogTemplate, {
        width: '250px'
      });

      this.templateDialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Handle the result here if needed
          // console.log('Dialog closed with result:', result);
          // Add the result (new rule ID) to your saved rules array if needed
        }
        // Reset the templateDialogRef to null after dialog is closed
        this.templateDialogRef = undefined;

      });
    }
  }

  validateAndSave(ruleName: string, ruleDescription: string): void {
    if (this.selectedQueue && this.savedRuleType && ruleName) {
      if (ruleDescription) {
        this.saveNewRule(ruleName, this.interfaceStates, ruleDescription);
      }
      else {
        this.saveNewRule(ruleName, this.interfaceStates);

      }
    } else {
      // Optionally, display an error message to the user
      console.log('Please fill in all fields.');
    }
  }


  saveNewRule(newRuleName: any, interfaceStates: any, ruleDescription?: string): void {
    if (newRuleName.trim()) {
      if(ruleDescription){
      this.savedrulesService.addRule(this.selectedQueue, this.savedRuleType, newRuleName, interfaceStates, ruleDescription);
      }
      this.savedrulesService.addRule(this.selectedQueue, this.savedRuleType, newRuleName, interfaceStates);

      }
      this.templateDialogRef?.close(newRuleName);
    }
  variables = ['varA', 'varB', 'varC'];
  addVariable(variableType: string, index: number, event: any) {
    const newVariable = event.target.value.trim();
    if (newVariable && !this.variables.includes(newVariable)) {
      this.variables.push(newVariable);
      // Add new variable to the list if it's not already there
      // this.interfaceStates[index][variableType] = newVariable; // Update the corresponding variable in interfaceStates
      // event.target.value = ''; // Clear the input field after adding the variable

      // Set the selected value in mat-select to the newly added variable
      this.interfaceStates[index][variableType] = newVariable;
      event.target.value = '';
    }
    this.interfaceStates[index][variableType] = newVariable;

  }

  onVariableChange(event: any, variableType: string, index: number) {
    // if (event.value === 'new') {
    //   this.interfaceStates[index][variableType] = ''; // Clear the variable in interfaceStates if "new" is selected
    // }
  }

  addListInputs(stateIndex: number, inputIndex: number) {
    const state = this.interfaceStates[stateIndex];
    if (!this.interfaceStates[stateIndex].list) {
      this.interfaceStates[stateIndex].list = [];
    }
    if (state.list[inputIndex].trim() !== '') {
      state.list.push('');
    }
  }
  removeListInputs(stateIndex: number, inputIndex: number) {
    const state = this.interfaceStates[stateIndex];
    state.list.splice(inputIndex)
  }

  updateListInput(stateIndex: number, inputIndex: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.interfaceStates[stateIndex].list[inputIndex] = inputElement.value;
  }
  hasConnectingLine(index: any) {
    const state = this.interfaceStates[index]
    const nextState = this.interfaceStates[index + 1]
    const nextParentIndex = this.findNextParentIndex(index, state.depth)
    const nextParentState = this.interfaceStates[nextParentIndex]
    try {
      if ((state.type === 'andOr' || state.type === 'If') && nextState.type === 'andOr') {
        return false
      }
      else if (index === this.interfaceStates.length - 1 || state.depth > nextParentState.depth) {
        return false
      }
      return true
    } catch (er) {

    }
    return true;

  }
  calculateConnectingLineHeight(state: any): string {
    const currentIndex = this.interfaceStates.indexOf(state);
    if (currentIndex === -1) {
      return "0px"; // Handle case where the state is not found in interfaceStates
    }
    const nextParentIndex = this.findNextParentIndex(currentIndex, state.depth);
    let height = 0;
    let marginHeight;
    if (nextParentIndex == currentIndex + 1) {
      marginHeight = 0
    }
    else {
      marginHeight = 39.4
    }
    for (let i = currentIndex + 1; i <= nextParentIndex && i < this.interfaceStates.length; i++) {
      let type = this.interfaceStates[i]?.type;
      if (type === 'If') {
        height += 221.77 + marginHeight;
      } else if (type) {
        height += 59.45 + marginHeight;
      }
    }
    let calculatedHeight = height.toString() + "px";
    return calculatedHeight;
  }

  onEdit() {
    this.isPopup = true
  }
  
  saved_rules: any = []
  uiLogicOptions: string[] = ['If', 'Loop', 'Function', 'FetchValue','Set','andOr'];
  backendLogicOptions: string[] = ['Loop', 'If', 'Variable', 'Set', 'doSomething'];
  UI_plus_logic_options: string[] = ['If', 'Loop','andOr'];
  backend_plus_logic_options: string[] = ['Loop', 'If', 'Variable', 'Set', 'Elif', 'Print', 'doSomething','andOr'];
  // ui_then_fun_options:string[]=['Function','FetchValue']
  backend_then_fun_options: string[] = Object.keys(this.savedrulesService.backend_functions);
  onRuleTypeSelectionChange() {
    if (this.selectedRuleType === 'UI Rules') {
      this.logicOptions = this.uiLogicOptions;
      this.logicOptionsForPlus = this.UI_plus_logic_options
      this.functionOptions = this.ui_functions

    } 
    if (this.selectedRuleType === 'Backend Rules') {
      this.logicOptions = this.backendLogicOptions;
      this.logicOptionsForPlus = this.backend_plus_logic_options
      this.functionOptions = this.backend_then_fun_options

    }
    // Clear the selected logic option when the rule type changes
    // this.selectedLogicOption = null;
  }
  selectedOption!: string;
  onOptionSelect(option: string) {
    this.selectedOption = option;
  }


}
