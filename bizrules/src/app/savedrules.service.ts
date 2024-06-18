
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class SavedrulesService {
  // static addRule(rule: { variable: any; function: any; }) {
  //   throw new Error('Method not implemented.');
  // }
  // private rules: any[] = [];
   savedRules:any ={
    "Maker": {
        "UI Rules": {
            "one": [
                {
                    "type": "If",
                    "depth": 0,
                    "var1": "varA",
                    "var2": "varA",
                    "operator": "==",
                    "internalCondition": "and",
                    "externalCondition": ""
                },
                {
                    "type": "andOr",
                    "depth": 0,
                    "var1": "varA",
                    "var2": "varB",
                    "operator": "!=",
                    "internalCondition": "",
                    "externalCondition": ""
                },
                {
                    "type": "Then",
                    "depth": 0,
                    "variableName": "",
                    "function": "Hide"
                },
                {
                    "type": "Else",
                    "depth": 0,
                    "variableName": "",
                    "function": "Show"
                }
            ],
            "four": [
                {
                    "type": "Set",
                    "depth": 0,
                    "var": "varB",
                    "function": "doAssign"
                },
                {
                    "type": "Loop",
                    "depth": 0,
                    "function": "",
                    "var": "i",
                    "list": [
                        "1",
                        "2",
                        "3",
                        "4"
                    ]
                },
                {
                    "type": "Then",
                    "depth": 0,
                    "variableName": "",
                    "function": "doRegex"
                }
            ]
        }
    },
    "Reject": {
        "Backend Rules": {
            "two": [
                {
                    "type": "Set",
                    "depth": 0,
                    "var": "varA",
                    "function": "doAssign"
                },
                {
                    "type": "If",
                    "depth": 0,
                    "var1": "varB",
                    "var2": "varC",
                    "operator": ">",
                    "internalCondition": "",
                    "externalCondition": ""
                },
                {
                    "type": "Then",
                    "depth": 0,
                    "variableName": "",
                    "function": "Compare"
                },
                {
                    "type": "Else",
                    "depth": 0,
                    "variableName": "",
                    "function": "doRegex"
                }
            ],
            "five": [
                {
                    "type": "If",
                    "depth": 0,
                    "var1": "varB",
                    "var2": "varA",
                    "operator": "!=",
                    "internalCondition": "",
                    "externalCondition": ""
                },
                {
                    "type": "Then",
                    "depth": 0,
                    "variableName": "",
                    "function": "doAssign"
                },
                {
                    "type": "Else",
                    "depth": 0,
                    "variableName": "",
                    "function": "doRegex"
                }
            ]
        }
    },
    "Accept": {
        "Backend Rules": {
            "three": [
                {
                    "type": "If",
                    "depth": 0,
                    "var1": "varB",
                    "var2": "varC",
                    "operator": "==",
                    "internalCondition": "",
                    "externalCondition": ""
                },
                {
                    "type": "Then",
                    "depth": 0,
                    "variableName": "",
                    "function": ""
                },
                {
                    "type": "Loop",
                    "depth": 1,
                    "function": "",
                    "var": "i",
                    "list": [
                        "100",
                        "200",
                        "400",
                        "500"
                    ]
                },
                {
                    "type": "Then",
                    "depth": 1,
                    "variableName": "",
                    "function": "Compare"
                },
                {
                    "type": "Else",
                    "depth": 0,
                    "variableName": "",
                    "function": "Show"
                }
            ]
        }
    }
};
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
 