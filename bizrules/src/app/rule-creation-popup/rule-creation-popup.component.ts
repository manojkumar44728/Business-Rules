
import { Component, AfterViewInit, ElementRef, OnInit, ViewChild, TemplateRef, Input, Inject } from '@angular/core';
import { CdkDragStart, CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { SavedrulesService } from '../savedrules.service';
import { networkInterfaces } from 'os';
import { string } from 'blockly/core/utils';
import { MatSelectChange } from '@angular/material/select';

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
  showkeys: boolean = true;
  private templateDialogRef?: MatDialogRef<any>;
  state: any;
  Object: any;
  ngAfterViewInit() {
  }
  functionControl = new FormControl({ value: '', disabled: false });
  logicControl = new FormControl({ value: '', disabled: false });

  constructor(public dialogRef: MatDialogRef<RuleCreationPopupComponent>,
    public savedrulesService: SavedrulesService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.interfaceStates) {
      this.interfaceStates = this.interfaceStates = JSON.parse(JSON.stringify(data.interfaceStates)),
      
        this.isPopup = data.isPopup
        if(data.uiRule){
          this.functionOptions = this.ui_functions
        }else{
          this.functionOptions = this.backend_then_fun_options
        }
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  functionFilterCtrl = new FormControl();
  logicOptions: string[] = ['Loop', 'If', 'Variable', 'Set', 'doSomething'];
  logicOptionsForPlus: string[] = ['Loop', 'If', 'Variable', 'Set', 'Elif', 'Print', 'doSomething', 'andOr'];
  loopOptions: string[] = ['No of Times', 'Until', 'Item in List'];
  logicandor: string[] = ['andOr']
  selectedLogicOption: string = '';
  selectedLoopOption: string = '';
  var1: string = '';
  var2: string = '';
  selectedOperator: string = '';
  functionOptions: string[] = [];
  selectedFunction: string = '';
  operators: string[] = ['==', '!=', '>', '<', '>=', '<=', '-', '+', 'x', '%', '^'];
  code = ""
  variableControl = new FormControl();
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  filteredOptions!: Observable<string[]>;
  filteredFunctionOptions!: Observable<string[]>;
  filteredFunctions!: Observable<string[]>;
  flattenedFunctions: string[] = [];
  selectedfunctionoption = "";
  showLogicDropdown = false;
  queue_list = this.savedrulesService.queues_list
  rule_types = this.savedrulesService.rule_type_list
  ui_functions = this.savedrulesService.UIfunctionNames
  fetch_options = this.savedrulesService.fetchvalue
  backend_functions = this.savedrulesService.backend_functions
  backend_functions1 = this.savedrulesService.backend_functions1
  inputValues: { [key: string]: string } = {};
  fetchValue: string = '';

  selectedRuleType = ""
  savedRuleType = ""
  selectedQueue = ""
  ngOnInit(): void {
    // console.log(this.exception_functions,'exception_fun')
    this.filteredFunctionOptions = this.functionFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterFunctions(value))
      );
    this.filteredOptions = this.variableControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.functionKeys = Object.keys(this.backend_functions1);
    // console.log('keys',this.functionKeys)

    this.filteredFunctions = this.functionControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterFunctionKeys(value || ''))
    );

    this.interfaceStates.forEach(state => {
      if (!state.inputValues) {
        state.inputValues = {};
      }
      this.getFunctionValues(state).forEach((key: string) => {
        if (!(key in state.inputValues)) {
          state.inputValues[key] = '';
          // console.log(state.inputValues[key],'inputvalues')
        }
      });
    })
  }
  topLevelKeys: string[] = [];
  subKeyOptions: { [key: string]: string[] } = {};
  public showDropdown: { [key: string]: boolean } = {};

  getFunctionValues(state: any) {
    const index = this.interfaceStates.indexOf(state)
    state.inputValues = state.inputValues || {};
    let functionspair: any;

    if (this.selectedRuleType === "Backend Rules") {
      functionspair = this.savedrulesService.backend_functions1;
    } else {
      functionspair = this.savedrulesService.UI_functions;
    }

    const functionParams = functionspair[state.function] || [];

     // Initialize dataType if not present
     if (!state.dataType) {
      state.dataType = {};
  }

    if (state.function === 'get_data' || state.function === 'doAssign') {
      Object.keys(functionParams).forEach((key: string) => {
        if (!(key in state.inputValues)) {
          state.inputValues[key] = functionParams[key].reduce((acc: { [key: string]: string }, param: string) => {
            acc[param] = '';
            return acc;
          }, {});
        }

        if (typeof state.inputValues[key] === 'object' && Object.keys(state.inputValues[key]).length > 0) {
          if (key == "value" ) {
            this.subKeyOptions[key] = ["", ...this.variables]
          } else {
            this.subKeyOptions[key] = Object.keys(state.inputValues[key]);
          }
          state.dataType[key] = 'dropdown';
          // console.log( this.subKeyOptions[key],'keys')
        } else {
          this.subKeyOptions[key] = [];
          state.dataType[key] = 'input';
        }
      });
    } else {
      functionParams.forEach((key: string) => {
        if (!(key in state.inputValues)) {
          state.inputValues[key] = '';
        }
        if( key == "phrase" || key == "main_string"){
          this.subKeyOptions[key] = ["", ...this.variables]
          state.dataType[key] = 'dropdown'; 
        }else {
          state.dataType[key] = 'input'; // Set data type as input
      }
      });

      // return keys;
    }

    const topLevelKeys = Object.keys(state.inputValues);
    this.interfaceStates[index] = state
    return topLevelKeys.length > 0 ? topLevelKeys : [];
  }
  // enteredValue: string = ''
  onSelectionChange1(stateIndex: number, keyIndex: number, key: string, event: any) {
    let selectedValue;
    let state = this.interfaceStates[stateIndex];

    // Determine the selected value based on the event type
    if (event.target && event.target instanceof HTMLInputElement) {
        selectedValue = event.target.value;
    } else if (event instanceof MatSelectChange) {
        selectedValue = event.value;
    } else {
        selectedValue = "";
    }

    // Initialize the array if it doesn't exist for the selectedValue
    if (!state[selectedValue]) {
        state[selectedValue] = [];
    }

    // Update or push the selectedValue into the array at keyIndex
    if (state[selectedValue][keyIndex] !== undefined) {
        state[selectedValue][keyIndex] = selectedValue;
    } else {
        state[selectedValue].push(selectedValue);
    }

    // Ensure inputValues is initialized and updated
    if (!state.inputValues) {
        state.inputValues = {};
    }
    state.inputValues[key] = selectedValue;

    // Construct the formatted string based on the key
    let formattedString;
    if (['value', 'phrase', 'main_string', 'left_param', 'right_param'].includes(key)) {
        formattedString = `"${key}":${selectedValue}`;
    } else {
        formattedString = `"${key}":"${selectedValue}"`;
    }

    // Ensure formattedString array is initialized
    if (!state.formattedString) {
        state.formattedString = [];
    }

    // Clear previous entries for the key in formattedString
    state.formattedString = state.formattedString.filter(
        (item: string) => !item.startsWith(`"${key}":`)
    );

    // Add the new formatted string
    state.formattedString.push(formattedString);
}



  onSelectionChange(event: MatSelectChange, state: any) {

    const selectedOption = event.value; // Extract the selected value
    state.inputValues = {}; // Clear previous inputValues
    state.function = selectedOption;
    // console.log(selectedOption, 'selectedoption');
  }


  logInputValues(state: any): string {
    const keyValuePairs: string[] = [];

    // Ensure state.inputValues is defined and is an object
    if (state.inputValues && typeof state.inputValues === 'object') {
      for (const [key, value] of Object.entries(state.inputValues)) {
        if (key === 'value' || key === 'phrase' || key === 'left_param' || key === 'right_param') {
          keyValuePairs.push(`"${key}":${value}\n`);
        } else {
          keyValuePairs.push(`"${key}":"${value}"\n`);
        }
      }
    } else {
      console.error('state.inputValues is undefined or null');
    }

    const formattedString = keyValuePairs.join(',');
    // console.log(formattedString, 'formatted');

    return formattedString;
  }

  functionKeys: string[] = [];
  private _filterFunctions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.functionOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterFunctionKeys(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.functionKeys.filter(key => key.toLowerCase().includes(filterValue));
  }
  addCustomFunction(event: any) {
    let newFunction = event.target.value.trim();
    if (newFunction) {
      if (this.selectedRuleType === "Backend Rules" && !this.savedrulesService.backend_functions[newFunction]) {
        this.savedrulesService.backend_functions1[newFunction] = [""];
      } else if (this.selectedRuleType === "UI Rules" && !this.savedrulesService.UI_functions[newFunction]) {
        this.savedrulesService.UI_functions[newFunction] = [""];
      }

      this.functionOptions.push(newFunction);

      this.updateFilteredFunctionOptions();
      event.target.value = '';
      // console.log(newFunction,'newfunction')
    }
  }
  preventSpaceSelection(event: any) {
    event.stopPropagation();
  }
  addParams(event: any, i: number) {
    let newParam = event.target.value.trim();
    const functionName = this.interfaceStates[i].function
    // console.log('Adding Param:', newParam, 'to Function:', functionName);
    if (newParam) {
      if (this.selectedRuleType === "Backend Rules") {
        this.savedrulesService.backend_functions1[functionName].push(newParam)
        // console.log(this.backend_functions1,'1')
      } else if (this.selectedRuleType === "UI Rules") {
        this.savedrulesService.UI_functions[functionName].push(newParam)
      }

      this.updateFilteredFunctionOptions();
    }

  }

  updateFilteredFunctionOptions() {
    this.filteredFunctionOptions = this.functionFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterFunctions(value))
      );
  }
  onOperatorChange(event: any) {
    this.selectedOperator = event.target.value;
  }
  addInterface(type: any, index: number, depth: number) {
    let newInterface: any = { type: type, depth: depth };

    if (type === 'If' || type === 'Elif') {
      newInterface = { ...newInterface, var1: '', var2: '', operator: '', internalCondition: '', externalCondition: '' };
      // console.log(type, 'type', depth, 'depth')
    }
    else if (type === 'Then' || type === 'Else') {
      newInterface = { ...newInterface, variableName: '', function: '', selectedValues: [], formattedString: '', enteredValue: '' };
    }
    else if (type === 'Variable') {
      newInterface = { ...newInterface, variableName: '', enteredValue: '' };

    }
    else if (type === 'Function') {
      newInterface = { ...newInterface, variableName: '', function: '' };

    }
    else if (type === 'FetchValue') {
      newInterface = { ...newInterface };

    }
    else if (type === 'andOr') {
      newInterface = { ...newInterface, var1: '', var2: '', operator: '', internalCondition: '', externalCondition: '' };
      // console.log(this.interfaceStates)
    }
    else if (type === 'Set') {

      newInterface = { ...newInterface, var: '', function: '', logic: '', showFunctionSelect: true, showLogicSelect: true };

    }
    else if (type === 'doSomething') {
      newInterface = { ...newInterface, function: '', var1: '', var2: '' };
    }
    else if (type === 'Loop') {
      newInterface = { ...newInterface, function: '', var: 'i', list: [''] };

    }
    else if (type === 'Print') {
      newInterface = { ...newInterface, var: '' };

    }
    else if (type === 'Return') {
      newInterface = { ...newInterface, function: '' };
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
    // if (state.type === 'Set') {
    //   this.interfaceStates.splice(currentIndex, 1);    
    //   if (currentIndex < this.interfaceStates.length && this.interfaceStates[currentIndex].type === 'andOr') {
    //     this.interfaceStates.splice(currentIndex, 1); 
    //   }
    // }
    if (state.type === 'Set') {
      this.interfaceStates.splice(currentIndex, 1);
      while (currentIndex < this.interfaceStates.length && this.interfaceStates[currentIndex].type === 'andOr') {
        this.interfaceStates.splice(currentIndex, 1);
      }
    }

    else if ((state.type === 'Variable') || (state.type === 'Function') || (state.type === 'FetchValue') || (state.type === 'Set') || (state.type === 'Print')) {
      this.interfaceStates.splice(currentIndex, 1)
    }
    else if (state.type === 'doSomething') {
      for (let i = currentIndex + 1; i < this.interfaceStates.length; i++) {
        if (this.interfaceStates[i].depth === currentDepth) {
          if (this.interfaceStates[i].type !== 'Return' && this.interfaceStates[i].type !== 'andOr') {
            nextParentIndex = i
            break;
          }
        }
      }

      if (nextParentIndex === currentIndex) {
        nextParentIndex = this.interfaceStates.length
      }
      this.interfaceStates.splice(currentIndex, nextParentIndex - currentIndex)

    }
  }

  onLogicOptionChange(selectedLogicOption: any) {
    if (selectedLogicOption == 'If') {
      this.addInterface('If', this.interfaceStates.length, 0);
      this.addInterface('Then', this.interfaceStates.length, 0);
      this.addInterface('Else', this.interfaceStates.length, 0)

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
      this.addInterface('andOr', this.interfaceStates.length, 0);
      this.addInterface('Return', this.interfaceStates.length, 0);


    }
    if (selectedLogicOption == 'Function') {
      this.addInterface('Function', this.interfaceStates.length, 0);

    }
    if (selectedLogicOption == 'FetchValue') {
      this.addInterface('FetchValue', this.interfaceStates.length, 0);

    }
    if (selectedLogicOption == 'andOr') {
      this.addInterface('andOr', this.interfaceStates.length, 0);
    }


  }
  space = 0
  selectedSetoption: any
  hideblock: boolean = false;
  onFunctionChange(selectedFunction: any, state: any,) {
    if (state.type == 'Set' || state.type == 'Then') {
      if (this.functionOptions.includes(selectedFunction)) {
        state.showLogicSelect = false
      }
      else if (this.logicandor.includes(selectedFunction)) {
        state.showFunctionSelect = false;
      }
    }
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
      this.addInterface('Set', addingIndex, depth)
    }
    else if (selectedFunction === 'Print') {
      this.addInterface('Print', addingIndex, depth + 1)
    }
    else if (selectedFunction === 'doSomething') {
      this.addInterface('doSomething', addingIndex, depth)
      this.addInterface('andOr', addingIndex + 1, depth)
      this.addInterface('Return', addingIndex + 2, depth)

    }
    else if (selectedFunction === 'andOr') {
      this.addInterface('andOr', addingIndex, depth)
      this.interfaceStates[index].function = selectedFunction;
    }

    else {
      // For other functions, just update the function property of the state
      this.interfaceStates[index].function = selectedFunction;
    }
    // console.log(this.interfaceStates)
    this.showLogicDropdown = false;


  }

  onClose(): void {
    this.dialogRef.close();
  }
  Close(): void {
    if (this.templateDialogRef) {
      this.templateDialogRef.close();
    }
  }

  setInternalActiveButton(button: string, state: any) {
    const index = this.interfaceStates.indexOf(state);
    // console.log(state, index);
    const depth = state.depth;
    if (state.externalCondition === '') {
      if (state.internalCondition === '') {
        this.addInterface('andOr', index + 1, depth);
        this.interfaceStates[index].internalCondition = button;
      }
      else {
        this.interfaceStates[index].internalCondition = button;
      }
    }
    else {
      if (state.internalCondition === '') {
        this.addInterface('andOr', index + 1, depth);
        this.interfaceStates[index].internalCondition = button;
        this.interfaceStates[index + 1].externalCondition = this.interfaceStates[index].externalCondition;
        this.interfaceStates[index].externalCondition = '';

      }
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
    if (this.interfaceStates[index + 1] && this.interfaceStates[index + 1].type !== 'andOr' || this.interfaceStates[index].externalCondition) {
      return true
    }
    return false

  }
  generateCode(): string {
    if (this.selectedRuleType === 'UI Rules') {
      return this.generateJavascriptCode();
    }
    else {
      return this.generatePythonCode();
    }
  }
  generateJavascriptCode(): string {
    let javascriptCode = '';

    this.interfaceStates.forEach(state => {
        let indentation = '    '.repeat(state.depth || 0); // Indentation based on state.depth

        if (state.type === 'Variable') {
            javascriptCode += `${indentation}${state.variableName} = ${state.function};\n`;
        }
        else if (state.type === 'Set') {
            if (this.selectedRuleType === 'UI Rules') {
                javascriptCode += `${indentation}var ${state.var};\n`;
            }
            if (state.function === 'andOr') {
                javascriptCode += `${indentation}${state.var} = `;
            }
            else {
                javascriptCode += `${indentation}${state.var} = this.${state.function}(${state.formattedString});\n`;
            }
        }
        else if (state.type === 'If') {
            if (state.externalCondition) {
                javascriptCode += `${indentation}if (${state.var1} ${state.operator} ${state.var2} ${state.internalCondition} ${state.externalCondition}) {\n`;
            }
            else {
                const var1 = state.var1 ? state.var1 : "''";
                const var2 = state.var2 ? state.var2 : "''";
                javascriptCode += `${indentation}if (${var1} ${state.operator} ${var2} ${state.internalCondition}) {\n`;
            }
        }
        else if (state.type === 'andOr') {
            const index = this.interfaceStates.indexOf(state);
            const previous_state = this.interfaceStates[index - 1];

            if (previous_state.type === 'If') {
                javascriptCode = javascriptCode.slice(0, -1); // Remove last character (the extra newline)
            }

            if (state.externalCondition) {
                javascriptCode += `${state.var1} ${state.operator} ${state.var2} ${state.internalCondition} ${state.externalCondition}) {\n`;
            }
            else if (this.selectedSetoption === 'andOr') {
                javascriptCode += `${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}\n`;
            }
            else {
                javascriptCode += `${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}) {\n`;
            }
        }
        else if (this.selectedRuleType === 'UI Rules' && state.type === 'Then' && state.function) {
            javascriptCode += `${indentation}this.${state.function}(${state.formattedString});\n`;
        }
        else if (this.selectedRuleType === 'UI Rules' && state.type === 'Else' && state.function) {
            javascriptCode += `${indentation}else {\n`;
            if (state.function) {
                javascriptCode += `${indentation}    this.${state.function}(${state.formattedString});\n`;
            }
            javascriptCode += `${indentation}}\n`;
        }
        else if (state.type === 'Elif') {
            javascriptCode += `${indentation}else if (${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}) {\n`;
        }
        else if (state.type === 'Loop') {
            javascriptCode += `${indentation}let list = [${state.list}];\n`;
            javascriptCode += `${indentation}for (let ${state.var} of list) {\n`;
        }
        else if (state.type === 'Print') {
            javascriptCode += `${indentation}console.log("${state.var}");\n`;
        }
        else if (state.type === 'doSomething') {
            javascriptCode += `${indentation}function ${state.var}() {\n`;
            javascriptCode += `${indentation}    if (${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}) {\n`;
            javascriptCode += `${indentation}        return ${state.var}();\n`;
            javascriptCode += `${indentation}    }\n`;
            javascriptCode += `${indentation}}\n`;
        }
        else if (state.type === 'Function') {
            javascriptCode += `this.${state.function}(${state.formattedString});\n`;
        }
        else if (state.type === 'FetchValue') {
            javascriptCode += `this.FetchValue(${this.fetchValue},${this.selectedOption});\n`;
        }
    });

    return javascriptCode;
}

  
  generatePythonCode(): string {
    let pythonCode = '';
    const addedVariables: Set<string> = new Set();
    const variablesToDeclare: Set<string> = new Set();
    // Helper function to check if a variable should be declared
    const shouldDeclareVariable = (variable: string): boolean => {
      return !['True', 'False', ' ','null', 'none'].includes(variable);
    };

    // First pass: collect all unique variables
    this.interfaceStates.forEach(state => {
      if (state.var1 && shouldDeclareVariable(state.var1)) variablesToDeclare.add(state.var1);
      if (state.var2 && shouldDeclareVariable(state.var2)) variablesToDeclare.add(state.var2);
      if (state.var && shouldDeclareVariable(state.var)) variablesToDeclare.add(state.var);
    });

    // Declare variables at the top
    variablesToDeclare.forEach(variable => {
      pythonCode += `${variable} = None\n`;
    });

    // Add an extra line for separation
    pythonCode += '\n';
    this.interfaceStates.forEach(state => {
      let indentation = '    '.repeat(state.depth || 0); // Indentation based on state.depth

      if (state.type === 'Variable') {
        pythonCode += `${indentation}${state.variableName} = ${state.enteredValue}\n`;
      }
      else if (state.type === 'Set') {
        const index = this.interfaceStates.indexOf(state)
        const previous_state = this.interfaceStates[index - 1]

        if (!addedVariables.has(state.var) && state.var) {
          // pythonCode += `${indentation}${state.var} = None\n\n`;
          addedVariables.add(state.var);
        }
        // pythonCode += `${indentation}${state.var} = None\n`;
        if (state.function === 'andOr') {
          pythonCode += `${state.var} = `;
        }
        else if (state.function === 'doAssign' || state.function === 'get_data') {
          pythonCode += `${state.var} = BR.${state.function}({${state.formattedString}})\n\n`;

        }
        else if (previous_state && (previous_state.type === 'If' || previous_state.type === 'Then' || previous_state.type === 'Else')) {
          if (state.function) {
            pythonCode += `   ${indentation}${state.var} = BR.${state.function}({${state.formattedString}})\n\n`;
          }
        }
        else {
          if (state.function) {
            pythonCode += `${state.var} = BR.${state.function}({${state.formattedString}})\n\n`;
          }
        }
      }
      else if (state.type === 'If') {
        if (state.externalCondition) {
          pythonCode += `${indentation}if ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition} ${state.externalCondition}\n`;
        }
        else if (state.internalCondition) {

          pythonCode += `${indentation}if ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}\n`;

        }
        else {
          // if(state.operator ==='+' || state.operator ==='-' || state.operator ==='x' || state.operator === '%'){
          // pythonCode += ` if ${state.var1} ${state.operator} ${state.var2}\n\n`;
          // }
          // else{
          pythonCode += `if ${state.var1} ${state.operator} ${state.var2}:\n`;
          // }
        }
      }
      else if (state.type === 'andOr') {
        const index = this.interfaceStates.indexOf(state)
        const previous_state = this.interfaceStates[index - 1]
        if (previous_state.type === 'If') {
          // pythonCode = pythonCode.slice(0, -1);
        }
        else if (previous_state.type === 'Set') {
          // pythonCode = pythonCode.slice(0, -1);

        }
        if (previous_state.type === 'doSomething') {
          pythonCode = pythonCode;

        }
        if (state.externalCondition) {
          pythonCode += ` ${state.var1} ${state.operator} ${state.var2}: ${state.internalCondition}${state.externalCondition}`;
        }
        else if (state.internalCondition) {
          pythonCode += ` ${state.var1} ${state.operator} ${state.var2} ${state.internalCondition}`;
        }
        else {
          // if(state.operator ==='+' || state.operator ==='-' || state.operator ==='x' || state.operator === '%'){
          pythonCode += ` ${state.var1} ${state.operator} ${state.var2}\n`;
          // }
          // else{
          // pythonCode += ` ${state.var1} ${state.operator} ${state.var2}:\n`;
          // }
        }
      }
      else if (state.type === 'Then' && state.function) {
        if (state.function === 'doAssign' || state.function === 'get_data') {

          pythonCode += `   ${indentation}BR.${state.function}({${state.formattedString}})\n`;
        }
        else {
          if (state.function) {
            pythonCode += `   ${indentation}BR.${state.function}({${state.formattedString}})\n`;
          }
        }
      }


      else if (state.type === 'Else') {
        if (state.function && (state.function === 'doAssign' || state.function === 'get_data')) {
          pythonCode += `${indentation}else:\n`;
          pythonCode += `   ${indentation}BR.${state.function}({${state.formattedString}})\n`
        }
        else {
          pythonCode += `${indentation}else:\n`;
          if (state.function) {
            pythonCode += `   ${indentation}BR.${state.function}({${state.formattedString}})\n`
          }
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
        pythonCode += `print('${state.var}')\n`
        pythonCode += `print(${state.var})\n`

      }
      else if (state.type === 'doSomething') {

        pythonCode += `${indentation}def ${state.function}():\n`
        const index = this.interfaceStates.indexOf(state)

        let dosomethingIndex = -1; // Initialize to -1 to indicate not found

        for (let i = index; i >= 0; i++) {
          if (this.interfaceStates[i].type === 'andOr') {
            dosomethingIndex = i;
            break;
          }
        }
        const var1 = this.interfaceStates[dosomethingIndex].var1
        const var2 = this.interfaceStates[dosomethingIndex].var2

        pythonCode += ` ${var1},${var2}\n  ${indentation}if`


      }
      else if (state.type === 'Function') {
        if (state.function === 'doAssign' || state.function === 'get_data') {

          pythonCode += `BR.${state.function}({${state.formattedString}})\n`;
        }
        else {
          pythonCode += `BR.${state.function}({${this.logInputValues(state)}})\n`;

        }
      }
      else if (state.type === 'FetchValue') {
        pythonCode += `this.FetchValue(${this.fetchValue},${this.selectedOption})\n`
      }
      else if (state.type === 'Return') {
        if (state.function === 'doAssign' || state.function === 'get_data') {

          pythonCode += `${indentation}   return BR.${state.function}({${state.formattedString}})\n `;
        }
        else {
          pythonCode += `${indentation}   return BR.${state.function}({${this.logInputValues(state)}})\n `;

        }
        const index = this.interfaceStates.indexOf(state)

        let dosomethingIndex = -1; // Initialize to -1 to indicate not found

        for (let i = index; i >= 0; i--) {
          if (this.interfaceStates[i].type === 'doSomething') {
            dosomethingIndex = i;
            break;
          }
        }
        const doFunction = this.interfaceStates[dosomethingIndex].function
        pythonCode += `${doFunction}()\n`
      }
    });
    console.log(pythonCode, 'pythoneCode')
    // return pythonCode;
    // Function to escape the Python code
    const escapePythonCode = (code: string): string => {
      return code
        .replace(/\\/g, '\\\\') // Escape backslashes
        .replace(/"/g, '\\"')   // Escape double quotes
        .replace(/\n/g, '\\n')  // Replace newlines with \n
        .replace(/\r/g, '\\r'); // Replace carriage returns with \r (if any)
    }
    console.log(this.interfaceStates, 'interfacestates')
    const escapedPythonCode = escapePythonCode(pythonCode);
    // console.log(escapedPythonCode, 'escapedPythonCode');
    return pythonCode;
  }
  public inputValue: string = '';
  public returnfunction: string = '';

  // Function to update state.var whenever inputValue changes
  updateStateVar(index: number, value: string): void {
    const modifiedValue = value.replace(/ /g, '_');
    this.interfaceStates[index].function = modifiedValue;
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
      console.log('Please fill in all fields.');
    }
  }


  saveNewRule(newRuleName: any, interfaceStates: any, ruleDescription?: string): void {
    if (newRuleName.trim()) {
      if (ruleDescription) {
        this.savedrulesService.addRule(this.selectedQueue, this.savedRuleType, newRuleName, interfaceStates, ruleDescription);
      }
      this.savedrulesService.addRule(this.selectedQueue, this.savedRuleType, newRuleName, interfaceStates);

    }
    this.templateDialogRef?.close(newRuleName);
  }
  variables = ['facility', 'entity', 'reg_facility', 'result_facility', 'variance', 'variance res', 'float_variance', 'float_value', 'result', 'result_entity', 'result_faclity', 'reg_entity', 'value', 'int type result', 'reg_value', 'True', 'False'];
  addVariable(variableType: string, index: number, event: any) {
    const newVariable = event.target.value.trim();
    if (newVariable && !this.variables.includes(newVariable)) {
      this.variables.push(newVariable);
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
      return "0px";
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
  uiLogicOptions: string[] = ['If', 'Loop', 'Function', 'FetchValue', 'Set', 'andOr'];
  backendLogicOptions: string[] = ['Loop', 'If', 'Variable', 'Function', 'Set', 'doSomething'];
  UI_plus_logic_options: string[] = ['If', 'Loop', 'andOr'];
  backend_plus_logic_options: string[] = ['Loop', 'If', 'Variable', 'Set', 'Elif', 'Print', 'doSomething', 'andOr'];
  backend_then_fun_options: string[] = Object.keys(this.savedrulesService.backend_functions1);
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

  isArrayAndNonEmpty(key: any): boolean {
    return Array.isArray(key) && key.length > 0;
  }
  
}
