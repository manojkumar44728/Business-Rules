import { Component, OnInit } from '@angular/core';
import { RuleCreationPopupComponent } from '../rule-creation-popup/rule-creation-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { SavedrulesService } from '../savedrules.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
// import { Rule1Component } from '../rule1/rule1.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  constructor(private dialog: MatDialog, public savedrulesService: SavedrulesService) { }
  searchQuery = "";
  selectedRuleType = ""
  selectedQueue = ""
  queue_list = this.savedrulesService.queues_list
  rule_types = this.savedrulesService.rule_type_list
  saved_rules: any = []
  createrulediv: boolean = false
  selectedInterfaceStates = []
  searchControl = new FormControl();
  filteredRules!: Observable<any[]>;
  availableRules: { ruleName: string, ruleId: string }[] = [];
  ruleAddedSubscription!: Subscription;

  ngOnInit() {
    this.initializeFilteredRules();
    this.filteredRules = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this.searchRules(value))
    );

    this.ruleAddedSubscription = this.savedrulesService.ruleAdded$.subscribe(() => {
    this.availableRules = [];
      this.initializeFilteredRules();
      this.searchControl.setValue('');
    });
  }
  ngOnDestroy() {
    if (this.ruleAddedSubscription) {
      this.ruleAddedSubscription.unsubscribe();
    }
  }


  closecreateDiv(): void {
    this.createrulediv = false
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
      panelClass: 'custom-dialog-container',
      data: {
        interfaceStates: this.selectedInterfaceStates,
        isPopup: false
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

  searchRules(searchQuery: string): any[] {
    const searchQueryLower = searchQuery.toLowerCase();
    const savedRules = this.savedrulesService.savedRules
      let match = false
      for (let queue in savedRules) {
        for (let ruleType in this.savedrulesService.savedRules[queue]) {
          for (let ruleId in this.savedrulesService.savedRules[queue][ruleType]) {
            if (ruleId.toLowerCase() === searchQueryLower) {
              this.selectedQueue = queue
              this.selectedRuleType = ruleType
              this.saved_rules = Object.keys(savedRules[this.selectedQueue][this.selectedRuleType]);
              match = true
  
            }
          }
        }
      }
      if (!match) {
        this.selectedQueue = ""
        this.selectedRuleType = ""
        this.saved_rules = []
      }
    return this.availableRules.filter(rule => 
      rule.ruleId.toLowerCase().includes(searchQueryLower) || 
      rule.ruleName.toLowerCase().includes(searchQueryLower)
    );
  }

  // searchRules(searchQuery: string): string[] {
  //   const searchQueryLower = searchQuery.toLowerCase();
  //   const savedRules = this.savedrulesService.savedRules
  //   let match = false
  //   for (let queue in savedRules) {
  //     for (let ruleType in this.savedrulesService.savedRules[queue]) {
  //       for (let ruleId in this.savedrulesService.savedRules[queue][ruleType]) {
  //         if (ruleId.toLowerCase() === searchQueryLower) {
  //           this.selectedQueue = queue
  //           this.selectedRuleType = ruleType
  //           this.saved_rules = Object.keys(savedRules[this.selectedQueue][this.selectedRuleType]);
  //           match = true

  //         }
  //       }
  //     }
  //   }
  //   if (!match) {
  //     this.selectedQueue = ""
  //     this.selectedRuleType = ""
  //     this.saved_rules = []
  //   }
  //   return this.availableRules.filter(ruleId =>
  //     ruleId.toLowerCase().includes(searchQueryLower)
  //   );
  // }

  initializeFilteredRules(): void {
    for (let queue in this.savedrulesService.savedRules) {
      for (let ruleType in this.savedrulesService.savedRules[queue]) {
        for (let ruleId in this.savedrulesService.savedRules[queue][ruleType]) {
          const rule = this.savedrulesService.savedRules.rules.find((r:any) => r.rule_id === ruleId);
          if (rule) {
            this.availableRules.push({ ruleName: rule.rule_name, ruleId: rule.rule_id });
          }
        }
      }
    }
  }
}
