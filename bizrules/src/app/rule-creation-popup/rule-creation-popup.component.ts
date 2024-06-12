
import { Component, AfterViewInit, ElementRef, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
  constructor(public dialogRef: MatDialogRef<RuleCreationPopupComponent>, private savedrulesService: SavedrulesService, private dialog: MatDialog) { }

  functionFilterCtrl = new FormControl();
  logicOptions: string[] = ['Loop', 'If', 'Variable', 'Set'];
  logicOptionsForPlus: string[] = ['Loop', 'If', 'Variable', 'Set', 'Elif'];
  loopOptions: string[] = ['No of Times', 'Until', 'Item in List'];
  selectedLogicOption: string = '';
  selectedLoopOption: string = '';
  var1: string = '';
  var2: string = '';
  selectedOperator: string = '';
  functionOptions: string[] = ['Compare', 'Hide', 'Show', 'doAssign', 'doRegex'];
  selectedFunction: string = '';
  operators: string[] = ['==', '!=', '>', '<', '>=', '<='];
  code = ""
  variableControl = new FormControl();
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  filteredOptions!: Observable<string[]>;
  filteredFunctionOptions!: Observable<string[]>;
  selectedfunctionoption = "";
  showLogicDropdown = false;
  saved_rules: any;
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
    this.saved_rules = this.savedrulesService.getAllRules()

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

    if (type === 'If' || type === 'Elif') {
      newInterface = { ...newInterface, var1: '', var2: '', operator: '', internalCondition: '' };
    }
    else if (type === 'Variable' || type === 'Then' || type === 'Else') {
      newInterface = { ...newInterface, variableName: '', function: '' };
    }
    else if (type === 'andOr') {
      newInterface = { ...newInterface, var1: '', var2: '', operator: '', internalCondition: '',externalCondition:'' };
    }
    else if (type === 'Set') {
      newInterface = { ...newInterface, var: '', function: '' };

    }
    else if (type === 'Loop') {
      newInterface = { ...newInterface, function: '', var: 'i', list: [''] };

    }

    this.interfaceStates.splice(index, 0, newInterface);
  }
  findNextParentIndex(index: number, depth: number,) {
    let nextParentIndex=index;
    for (let i = index; i < this.interfaceStates.length; i++) {
      if (this.interfaceStates[i].depth <= depth) {
        nextParentIndex = i;
        break;
      }
    }
    //if the dont have nextParent 
    if(index===nextParentIndex){
      nextParentIndex=this.interfaceStates.length
    }
    console.log('index:',index)
    console.log('depth:',depth)
    console.log('nextParentIndex:',nextParentIndex)
    console.log('sates:',this.interfaceStates)

    return nextParentIndex
  }
  removeInterface(state: any) {
    const currentIndex = this.interfaceStates.indexOf(state);
    const currentDepth = state.depth;
    let nextParentIndex=currentIndex;
  //if deletion
    if (state.type === 'If') {
      for (let i = currentIndex + 1; i < this.interfaceStates.length; i++){
        if (this.interfaceStates[i].depth === currentDepth){
          if (this.interfaceStates[i].type !== 'Else'&& this.interfaceStates[i].type !== 'Then'){
            nextParentIndex=i
            break;
          }
        }
      }
      if(nextParentIndex===currentIndex){
        nextParentIndex=this.interfaceStates.length
      }
      this.interfaceStates.splice(currentIndex, nextParentIndex - currentIndex)
      console.log("currentindex:",currentIndex)
      console.log("nextParentIndex:",nextParentIndex)
      console.log("no of states to be deleted:",nextParentIndex - currentIndex)
    }

    //else deletion
    else if (state.type === 'Else'){
      nextParentIndex =this.findNextParentIndex(currentIndex,currentDepth)
      this.interfaceStates.splice(currentIndex, nextParentIndex - currentIndex)
      console.log("no of states to be deleted:",nextParentIndex - currentIndex)
    }

    //loop deletion
    else if (state.type === 'Loop'){
      let nextThenIndex=currentIndex
      for (let i = currentIndex + 1; i < this.interfaceStates.length; i++) {
        //find the corresponding then index
        if (this.interfaceStates[i].type === 'Then') {
          if (this.interfaceStates[i].depth === currentDepth)
            nextThenIndex = i;
        }
      }
      nextParentIndex =this.findNextParentIndex(nextThenIndex,currentDepth)
      this.interfaceStates.splice(currentIndex, nextParentIndex - currentIndex)

    }

    //set deletion
    else if (state.type === 'Set'){
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

  }
  space = 0
  onFunctionChange(selectedFunction: any, state: any) {
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
      this.addInterface('Set', addingIndex, depth + 1)
    }
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

  setInternalActiveButton(button: string, state: any) {
    const index = this.interfaceStates.indexOf(state);
    console.log(state, index)
    const depth = state.depth
    if (state.internalCondition === '') {
      this.addInterface('andOr', index + 1, depth)
      this.interfaceStates[index].internalCondition = button;
    }
    else {
      this.interfaceStates[index].internalCondition = button;
    }

  }
  setExternalActiveButton(button: string, state: any) {
    const index = this.interfaceStates.indexOf(state);
    console.log(state, index)
    const depth = state.depth
    if (state.internalCondition === '') {
      this.addInterface('andOr', index + 1, depth)
      this.interfaceStates[index].externalCondition = button;
    }
    else {
      this.interfaceStates[index].externalCondition = button;
    }

  }
  isExternal(state:any){
    const index = this.interfaceStates.indexOf(state);
    if(this.interfaceStates[index+1].type!=='andOr'){
      return true
    }
    return false

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
      let indentation = '    '.repeat(state.depth || 0); // Indentation based on state.depth

      if (state.type === 'Variable') {
        pythonCode += `${indentation}${state.variableName} = ${state.function}\n`;
      } else if (state.type === 'Set') {
        pythonCode += `${indentation}${state.var} = ${state.function}()\n`;
      } else if (state.type === 'If') {
        pythonCode += `${indentation}if ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}:\n`;
      } else if (state.type === 'andOr') {
        pythonCode = pythonCode.slice(0, -2); // Adjust previous line indentation if needed
        pythonCode += `${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}:\n`;
      } else if (state.type === 'Then' && state.function) {
        pythonCode += `${indentation}    ${state.function}()\n`;
      } else if (state.type === 'Else') {
        pythonCode += `${indentation}else:`;
        if (state.function) {
          pythonCode += `\n${indentation}    ${state.function}()\n`
        }
      } else if (state.type === 'Elif') {
        pythonCode += `${indentation}elif ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}:\n`;
      } else if (state.type === 'Loop') {
        pythonCode += `${indentation}list = [${state.list}]\n`;
        pythonCode += `${indentation}for ${state.var} in list:\n`;
      }
    });
    return pythonCode;
  }


  generatedCode: string = '';
  isCodeModalVisible: boolean = false;

  showCodeModal(): void {
    this.isCodeModalVisible = !this.isCodeModalVisible
    if (this.isCodeModalVisible) {
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
    this.interfaceStates = this.savedrulesService.savedRules[rule_id]
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


}
