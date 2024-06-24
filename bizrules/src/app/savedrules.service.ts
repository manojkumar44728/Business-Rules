
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class SavedrulesService {
    private ruleAddedSource = new Subject<void>();
     ruleAdded$ = this.ruleAddedSource.asObservable();
    
       savedRules: any = {
           "Maker": {
               "UI Rules": {
                   "G4Q2-GS6F-43M8": [
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
                   "DF3X-4CRF-SSNK": [
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
                   "EZX7-OO1O-ES0G": [
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
                   "XXSV-3BSZ-H2OP": [
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
                   "UICP-31FX-E9N8": [
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
           },
           "rules": [
               {
                   "rule_id": "G4Q2-GS6F-43M8",
                   "rule_name": "testOne",
                   "rule_description": ""
               },
               {
                   "rule_id": "EZX7-OO1O-ES0G",
                   "rule_name": "testTwo",
                   "rule_description": ""
               },
               {
                   "rule_id": "UICP-31FX-E9N8",
                   "rule_name": "testThree",
                   "rule_description": ""
               },
               {
                   "rule_id": "DF3X-4CRF-SSNK",
                   "rule_name": "testFour",
                   "rule_description": ""
               },
               {
                   "rule_id": "XXSV-3BSZ-H2OP",
                   "rule_name": "testFive",
                   "rule_description": ""
               }
           ]
    
       };

   queues_list=['Maker','Reject','Accept','Discontinue']
   rule_type_list=['UI Rules','Backend Rules']
   fetchvalue=['Field','Queue']
  constructor() { }
  functionKeys: { [key: string]: string[] } = {
   'Setcolor': ['Component', 'Column', 'Text', 'Color', 'TextColor'],
  'Show': ['Tabname', 'Component', 'Type'],
  'Hide': ['Component', 'Reason'],
  'Showall': ['Field', 'Value', 'Type'],
  'Hideall': ['Field', 'Value', 'Type'],
  'Enable': ['Field', 'Value', 'Type'],
  'Disable': ['Field', 'Value', 'Type'],
  'Mandate': ['Field', 'Value', 'Type'],
  'Non-Mandate': ['Field', 'Value', 'Type'],
  'fetchValue': ['Field', 'Type'],
  'assignRule': ['Field', 'Value'],
  'hideComponent': ['Component'],

  'showComponent': ['Component'],
  'disableField': ['Field', 'Type', 'Value'],
  'enableField': ['Field', 'Type', 'Value'],
  'disabeComponent': ['Button'],
  'enableComponent': ['Button'],
  'showField': ['Field', 'Type', 'Value'],
  'showAllFields': ['Field', 'Type', 'Value'],
  'hideField': ['Field', 'Type', 'Value'],
  'hideAllField': ['Field', 'Type', 'Value'],
  'mandateField': ['Field', 'Type', 'Value'],
  'nonMandateField': ['Field', 'Type', 'Value'],
  'compareFields': ['Form', 'Field1', 'Field2', 'Condition'],
  'compareFieldValue': ['Form', 'Field1', 'Value', 'Condition'],
  'getLength': ['Field'],
  'calculateTableColumnValue': ['Field', 'Column', 'Operator'],
  'hideTabs': ['Component', 'List'],
  'showTabs': ['Component', 'List'],
  'disableTabs': ['Component', 'List'],
  'enableTabs': ['Component', 'List'],
  'binaryToDecimal': ['Binary'],
  'fetchGlobalValue': ['Value'],
  'disableQueueButtons': ['Data'],
  'dateCompare': ['Parameters'],
  'tableColHides': ['Params'],
  'TabNavigation': ['Component', 'Tab'],
  'tableColEquals': ['Params'],
  'runDateRangeRules': ['FunctionName', 'FieldSource', 'FieldType']

  };
  backend_functions = {
    'doCompare': ['string1', 'string2'],
    'doRegex': ['value', 'pattern'],
    'toLower': ['string'],
    'toUpper': ['string'],
    'doTypeConversion': ['value', 'targetType'],
    'andOr':[]
};

  functionNames = Object.keys(this.functionKeys);
  
  possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
   
      randomRuleId = ""
      generateId(ifen: number, chars: any) {
          let id_text = ""
          for (let i = 0; i < ifen; i++) {
              id_text += this.makeRandom(chars);
              if (i + 1 != ifen) {
                  id_text += "-"
              }
          }
          console.log(id_text, 'id_text')
          this.randomRuleId = id_text
          return id_text
      }
      makeRandom(lengthOfCode: number) {
          let text = "";
          for (let i = 0; i < lengthOfCode; i++) {
              text += this.possibleChars.charAt(Math.floor(Math.random() * this.possibleChars.length));
          }
          return text;
      }
  addRule(queue: any, rule_type: any, ruleName: any, interfaceStates: any, ruleDescription?: string): void {
          this.generateId(3, 4)
   
          if (!this.savedRules[queue]) {
              this.savedRules[queue] = {};
          }
          if (!this.savedRules[queue][rule_type]) {
              this.savedRules[queue][rule_type] = {};
          }
          this.savedRules[queue][rule_type][this.randomRuleId] = interfaceStates;
          if (ruleName) {
              let obj = {
                  "rule_id": this.randomRuleId,
                  "rule_name": ruleName,
                  "rule_description": ruleDescription ? ruleDescription : ""
              }
              this.savedRules["rules"].push(obj)
   
          }
          this.ruleAddedSource.next();
      }
   
}
 