
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class SavedrulesService {
  // static addRule(rule: { variable: any; function: any; }) {
  //   throw new Error('Method not implemented.');
  // }
  // private rules: any[] = [];
   savedRules:any = {};
   queues_list=['Maker','Reject','Accept','Discontinue']
   rule_type_list=['UI Rules','Backend Rules']
  constructor() { }
 
  addRule(queue: any, rule_type: any, ruleId: any, rule: any): void {
    if (!this.savedRules[queue]) {
      this.savedRules[queue] = {};
    }
    if (!this.savedRules[queue][rule_type]) {
      this.savedRules[queue][rule_type] = {};
    }
    this.savedRules[queue][rule_type][ruleId] = rule;
  }
  
  // addRule(rule: any) {
  //   this.rules.push(rule);
  //   // console.log(rule)
  // }
 
  // getRules() {
  //   return this.rules;
  // }
}
 