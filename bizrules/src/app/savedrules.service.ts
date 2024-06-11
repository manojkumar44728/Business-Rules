
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class SavedrulesService {
  // static addRule(rule: { variable: any; function: any; }) {
  //   throw new Error('Method not implemented.');
  // }
  // private rules: any[] = [];
   savedRules: { [key: string]: any } = {};
 
  constructor() { }
 
  addRule(ruleId: string, rule: any): void {
    this.savedRules[ruleId] = rule;
  }
 
  getRule(ruleId: string): any {
    return this.savedRules[ruleId];
  }
 
  getAllRules(): string[] {
    return Object.keys(this.savedRules);
  }
  // addRule(rule: any) {
  //   this.rules.push(rule);
  //   // console.log(rule)
  // }
 
  // getRules() {
  //   return this.rules;
  // }
}
 