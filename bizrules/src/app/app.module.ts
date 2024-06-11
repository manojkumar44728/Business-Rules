import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AddruleComponent } from './addrule/addrule.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { RuleCreationPopupComponent } from './rule-creation-popup/rule-creation-popup.component';
import { MatMenuModule } from '@angular/material/menu';
import { Rule1Component } from './rule1/rule1.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { Rule2Component } from './rule2/rule2.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
// import { RulebuilderComponent } from './rulebuilder/rulebuilder.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RuleCreationPopupComponent,
    Rule1Component,
    Rule2Component
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,MatDialogModule,MatDividerModule,NgxMatSelectSearchModule,
    AppRoutingModule,DragDropModule,FormsModule,BrowserAnimationsModule,MatInputModule,MatSelectModule,MatFormFieldModule,MatIconModule,MatMenuModule,MatAutocompleteModule
   

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
