import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rule1',
  templateUrl: './rule1.component.html',
  styleUrl: './rule1.component.scss'
})
export class Rule1Component {
  functionOptions: string[] = ['doAssign', 'get_data', 'doCompare'];
  operators: string[] = ['==', '!=', '>', '<', '>=', '<=']; 
  sourceOptions:string[]=['input','input_config','input_db']
  formdiv=false;
  formdiv2=false;
  showDropdown=true;
  formdivget=false;
  formdiv2get=false;
  openformdivget(){
    this.formdivget=true;

  }
  openformdiv2get(){
    this.formdiv2get=true;
  }
  openformdiv(){
    this.formdiv=true;

  }
  openformdiv2(){
    this.formdiv2=true
  }
  onRuleSelectionChange(value:any) {
    if (value === "doAssign") {
      this.formdiv2=false; 
      this.openformdiv()
    }
    else if(value==="get_data"){
      this.formdiv=false;
      this.openformdiv2()
    }
  }
  onRuleSelectionChangeget(value:any){
    if (value === "doAssign") {
      this.formdiv2get=false; 
      this.openformdivget()
    }
    else if(value==="get_data"){
      this.formdivget=false;
      this.openformdiv2get()
    }
  }
  form: FormGroup;
  formget:FormGroup;
  databases: string[] = ['queues', 'ambanketrade_extraction', 'Database3'];
  tables: { [key: string]: string[] } = {
    'queues': ['process_queue', 'Table2'],
    'ambanketrade_extraction': ['fbti_response', 'Table4'],
    'Database3': ['Table5', 'Table6']
  };
  columns: { [key: string]: string[] } = {
    'process_queue': ['fbti_reference_number_list', 'Column2'],
    'fbti_response': ['fbti_reference_number', 'Column4'],
    'Table3': ['Column5', 'Column6'],
    'Table4': ['Column7', 'Column8'],
    'Table5': ['Column9', 'Column10'],
    'Table6': ['Column11', 'Column12']
  };
  column_list:{ [key: string]: string[] }={
    'fbti_reference_number_list':['6574']
  }
  showDropdowns = false;
  showgetDropdowns = false;

  showValueInput = false;
  availableTables: string[] = [];
  availableColumns: string[] = [];
  variableInput: string = '';
  variableInputget:string='';

  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      source: [''],
      database: [''],
      table: [''],
      column: [''],
      value: ['']
    });
    this.formget = this.fb.group({
      source: [''],
      database: [''],
      table: [''],
      column: [''],
      value: ['']
    });
    
  }


  ngOnInit() {
    this.form.get('source')?.valueChanges.subscribe(value => {
      this.showDropdowns = value === 'input' || value === 'inputConfig';
      this.showValueInput = value === 'input';
      if (!this.showDropdowns) {
        this.form.get('database')?.reset();
        this.form.get('table')?.reset();
        this.form.get('column')?.reset();
        this.form.get('value')?.reset();
        this.availableTables = [];
        this.availableColumns = [];
      }
    });
    this.formget.get('source')?.valueChanges.subscribe(value => {
      this.showDropdowns = value === 'input' || value === 'inputConfig';
      this.showValueInput = value === 'input';
      if (!this.showDropdowns) {
        this.formget.get('database')?.reset();
        this.formget.get('table')?.reset();
        this.formget.get('column')?.reset();
        this.formget.get('value')?.reset();
        this.availableTables = [];
        this.availableColumns = [];
      }
    });
    this.form.get('database')?.valueChanges.subscribe(database => {
      if (database) {
        this.availableTables = this.tables[database] || [];
        this.form.get('table')?.reset();
        this.form.get('column')?.reset();
        this.availableColumns = [];
      }
    });
    this.formget.get('database')?.valueChanges.subscribe(database => {
      if (database) {
        this.availableTables = this.tables[database] || [];
        this.formget.get('table')?.reset();
        this.formget.get('column')?.reset();
        this.availableColumns = [];
      }
    });

    this.form.get('table')?.valueChanges.subscribe(table => {
      if (table) {
        this.availableColumns = this.columns[table] || [];
        this.form.get('column')?.reset();
      }
    });
    this.formget.get('table')?.valueChanges.subscribe(table => {
      if (table) {
        this.availableColumns = this.columns[table] || [];
        this.formget.get('column')?.reset();
      }
    });
  }
  // onClose(): void {
  //   this.dialogRef?.close();
  // }
  onKeyDown(event: Event): void {
   
        this.showDropdown=false;
        this.showDropdowns=false;

      
  }

  
}


