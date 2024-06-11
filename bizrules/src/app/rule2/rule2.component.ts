import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import * as joint from 'jointjs';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-rule2',
  templateUrl: './rule2.component.html',
  styleUrl: './rule2.component.scss'
})
export class Rule2Component {
  functionFilterCtrl = new FormControl();
  functionOptions: string[] = ['doAssign', 'get_data','ToLower','doRegex'];
  variableControl = new FormControl();
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  filteredOptions!: Observable<string[]>;
  filteredFunctionOptions!: Observable<string[]>;
  selectedfunctionoption="";
  constructor() {}

  ngOnInit() {
    this.filteredFunctionOptions = this.functionFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterFunctions(value))
      );
      this.filteredOptions = this.variableControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filterFunctions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.functionOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  addOption(newOption: string): void {
    if (newOption && !this.options.includes(newOption)) {
      this.options.push(newOption);
    }
    this.variableControl.setValue('');
    this.selectedfunctionoption=newOption
  }
  
  enter() {
    const value = this.variableControl.value;
    if (!this.options.some(entry => entry === value)) {
      this.options.push(value);
    }
    setTimeout(() => this.variableControl.setValue(value));
  }
  filterOptions(value: string): void {
    const filteredValues = this.options.filter(option => option.toLowerCase().includes(value.toLowerCase()));
    this.filteredOptions = of(filteredValues);
  }
  }

// export class Rule2Component {
//   // for custom code generation
//   blocks: string[] = [];
//   generatedCode: string = '';
//   graph!: joint.dia.Graph;
//   paper!: joint.dia.Paper;
//   customgeneratedCode: string = '';
//   addBlock(type: string) {
//     this.blocks.push(type);
//     this.customgenerateCode();
//   }

//   customgenerateCode() {
//     this.customgeneratedCode = this.blocks.map(block => {
//       switch (block) {
//         case 'if':
//           return 'if (condition) {\n  // code\n}';
//         case 'print':
//           return 'console.log("Hello World");';
//         default:
//           return '';
//       }
//     }).join('\n');
//   }

//   // using joint js
 
//   // ngOnInit() {
//   //   this.graph = new joint.dia.Graph();

//   //   this.paper = new joint.dia.Paper({
//   //     el: document.getElementById('paper'),
//   //     model: this.graph,
//   //     width: 800,
//   //     height: 600,
//   //     gridSize: 10
//   //   });

//   //   const rect = new joint.shapes.standard.Rectangle();
//   //   rect.position(100, 30);
//   //   rect.resize(100, 40);
//   //   rect.attr({
//   //     body: {
//   //       fill: 'blue'
//   //     },
//   //     label: {
//   //       text: 'Hello',
//   //       fill: 'white'
//   //     }
//   //   });
//   //   rect.addTo(this.graph);
//   // }

//   // generateCode() {
//   //   this.generatedCode = 'Generated code based on the diagram'; // Placeholder
//   // }



  
// }


