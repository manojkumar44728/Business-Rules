
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
                   "EZX7-OO1O-ES0G":[
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "facility",
                        "function": "get_data",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "source": {
                                "input_config":"",
                                "input":""
                            },
                            "database": {
                                "ambanketrade_email": "",
                                "ambanketrade_extraction": ""
                            },
                            "table": {
                                "fbti_response": "",
                                "ocr": "",
                                "table3": ""
                            },
                            "column": {
                                "fbti_reference_number": "",
                                "facility": "",
                                "entity": "",
                                "fbti_normal_interest_spread": "",
                                "fbti_interest_type": "",
                                "c_bl_reference_number": "",
                                "bl_reference_number": ""
                            }
                        },
                        "input_config": [
                            "input_config"
                        ],
                        "formattedString": [
                            "\"source\":\"input_config\"",
                            "\"database\":\"ambanketrade_extraction\"",
                            "\"table\":\"ocr\"",
                            "\"column\":\"facility\""
                        ],
                        "ambanketrade_extraction": [
                            "ambanketrade_extraction"
                        ],
                        "ocr": [
                            "ocr"
                        ],
                        "facility": [
                            "facility"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "facility",
                        "function": "toLower",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "value": ""
                        },
                        "facility": [
                            "facility"
                        ],
                        "formattedString": [
                            "\"value\":facility"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "reg_facility",
                        "function": "doRegex",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "phrase": "",
                            "regex_str": "",
                            "reg_model": ""
                        },
                        "facility": [
                            "facility"
                        ],
                        "formattedString": [
                            "\"phrase\":\"facility\"",
                            "\"regex_str\":\"[^a-zA-Z]\"",
                            "\"reg_model\":\"sub\""
                        ],
                        "[^a-zA-Z]": [
                            "[^a-zA-Z]"
                        ],
                        "sub": [
                            "sub"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "result_facility",
                        "function": "doContain_string",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "main_string": "",
                            "sub_string": ""
                        },
                        "result": [
                            "result"
                        ],
                        "formattedString": [
                            "\"main_string\":\"result_facility\"",
                            "\"sub_string\":\"invoicefinancing\""
                        ],
                        "result_facility": [
                            "result_facility"
                        ],
                        "invoicefinancing": [
                            "invoicefinancing"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "entity",
                        "function": "get_data",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "source": {
                                "input_config": "",
                                "input": "",
                                "input_1": "",
                                "input2": ""
                            },
                            "database": {
                                "ambanketrade_email": "",
                                "ambanketrade_extraction": ""
                            },
                            "table": {
                                "fbti_response": "",
                                "ocr": "",
                                "table3": ""
                            },
                            "column": {
                                "fbti_reference_number": "",
                                "facility": "",
                                "entity": "",
                                "fbti_normal_interest_spread": "",
                                "fbti_interest_type": "",
                                "c_bl_reference_number": "",
                                "bl_reference_number": ""
                            }
                        },
                        "input_config": [
                            "input_config"
                        ],
                        "formattedString": [
                            "\"source\":\"input_config\"",
                            "\"database\":\"ambanketrade_extraction\"",
                            "\"table\":\"ocr\"",
                            "\"column\":\"entity\""
                        ],
                        "ambanketrade_extraction": [
                            "ambanketrade_extraction"
                        ],
                        "ocr": [
                            "ocr"
                        ],
                        "entity": [
                            "entity"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "entity",
                        "function": "toLower",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "value": ""
                        },
                        "entity": [
                            "entity"
                        ],
                        "formattedString": [
                            "\"value\":entity"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "reg_entity",
                        "function": "doRegex",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "phrase": "",
                            "regex_str": "",
                            "reg_model": ""
                        },
                        "entity": [
                            "entity"
                        ],
                        "formattedString": [
                            "\"phrase\":\"entity\"",
                            "\"regex_str\":\"[^a-zA-Z]\"",
                            "\"reg_model\":\"sub\""
                        ],
                        "[^a-zA-Z]": [
                            "[^a-zA-Z]"
                        ],
                        "sub": [
                            "sub"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "result_entity",
                        "function": "doContain_string",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "main_string": "",
                            "sub_string": ""
                        },
                        "reg_entity": [
                            "reg_entity"
                        ],
                        "formattedString": [
                            "\"main_string\":\"reg_entity\"",
                            "\"sub_string\":\"islamic\""
                        ],
                        "islamic": [
                            "islamic"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "variance",
                        "function": "get_data",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "source": {
                                "input_config": "",
                                "input": "",
                                "input_1": "",
                                "input2": ""
                            },
                            "database": {
                                "ambanketrade_email": "",
                                "ambanketrade_extraction": ""
                            },
                            "table": {
                                "fbti_response": "",
                                "ocr": "",
                                "table3": ""
                            },
                            "column": {
                                "fbti_reference_number": "",
                                "facility": "",
                                "entity": "",
                                "fbti_normal_interest_spread": "",
                                "fbti_interest_type": "",
                                "c_bl_reference_number": "",
                                "bl_reference_number": ""
                            }
                        },
                        "input_config": [
                            "input_config"
                        ],
                        "formattedString": [
                            "\"source\":\"input_config\"",
                            "\"database\":\"ambanketrade_extraction\"",
                            "\"table\":\"fbti_response\"",
                            "\"column\":\"fbti_normal_interest_spread\""
                        ],
                        "ambanketrade_extraction": [
                            "ambanketrade_extraction"
                        ],
                        "fbti_response": [
                            "fbti_response"
                        ],
                        "fbti_normal_interest_spread": [
                            "fbti_normal_interest_spread"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "variance",
                        "function": "toLower",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "value": ""
                        },
                        "variance": [
                            "variance"
                        ],
                        "formattedString": [
                            "\"value\":variance"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "variance",
                        "function": "doRegex",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "phrase": "",
                            "regex_str": "",
                            "reg_model": ""
                        },
                        "variance": [
                            "variance"
                        ],
                        "formattedString": [
                            "\"phrase\":\"variance\"",
                            "\"regex_str\":\"[^\\d\\.]\"",
                            "\"reg_model\":\"sub\""
                        ],
                        "[^": [
                            "[^"
                        ],
                        "[^\\d\\": [
                            "[^\\d\\"
                        ],
                        "[^\\d\\.]": [
                            "[^\\d\\.]"
                        ],
                        "sub": [
                            "sub"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "variance res",
                        "function": "andOr",
                        "logic": "",
                        "showFunctionSelect": false,
                        "showLogicSelect": true,
                        "inputValues": {}
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "variance",
                        "var2": "null",
                        "operator": "!=",
                        "internalCondition": "and",
                        "externalCondition": ""
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "variance",
                        "var2": "''",
                        "operator": "!=",
                        "internalCondition": "and",
                        "externalCondition": ""
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "variance",
                        "var2": "none",
                        "operator": "!=",
                        "internalCondition": "",
                        "externalCondition": ""
                    },
                    {
                        "type": "If",
                        "depth": 0,
                        "var1": "variance res",
                        "var2": "True",
                        "operator": "==",
                        "internalCondition": "",
                        "externalCondition": ""
                    },
                    {
                        "type": "Then",
                        "depth": 0,
                        "variableName": "",
                        "function": "",
                        "selectedValues": [],
                        "formattedString": "",
                        "enteredValue": ""
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "float_variance",
                        "function": "doTypeConversion",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "value": "",
                            "data_type": ""
                        },
                        "variance": [
                            "variance"
                        ],
                        "formattedString": [
                            "\"value\":variance",
                            "\"data_type\":\"float\""
                        ],
                        "float": [
                            "float"
                        ]
                    },
                    {
                        "type": "Print",
                        "depth": 1,
                        "var": "float_variance"
                    },
                    {
                        "type": "Else",
                        "depth": 0,
                        "variableName": "",
                        "function": "",
                        "selectedValues": [],
                        "formattedString": "",
                        "enteredValue": ""
                    },
                    {
                        "0": [
                            "0"
                        ],
                        "type": "Set",
                        "depth": 0,
                        "var": "float_variance",
                        "function": "doTypeConversion",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "value": "",
                            "data_type": ""
                        },
                        "formattedString": [
                            "\"value\":0",
                            "\"data_type\":\"float\""
                        ],
                        "float": [
                            "float"
                        ]
                    },
                    {
                        "type": "Print",
                        "depth": 1,
                        "var": "float_variance"
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "value",
                        "function": "get_data",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "source": {
                                "input_config": "",
                                "input": "",
                                "input_1": "",
                                "input2": ""
                            },
                            "database": {
                                "ambanketrade_email": "",
                                "ambanketrade_extraction": ""
                            },
                            "table": {
                                "fbti_response": "",
                                "ocr": "",
                                "table3": ""
                            },
                            "column": {
                                "fbti_reference_number": "",
                                "facility": "",
                                "entity": "",
                                "fbti_normal_interest_spread": "",
                                "fbti_interest_type": "",
                                "c_bl_reference_number": "",
                                "bl_reference_number": ""
                            }
                        },
                        "input_config": [
                            "input_config"
                        ],
                        "formattedString": [
                            "\"source\":\"input_config\"",
                            "\"database\":\"ambanketrade_extraction\"",
                            "\"table\":\"fbti_response\"",
                            "\"column\":\"fbti_interest_type\""
                        ],
                        "ambanketrade_extraction": [
                            "ambanketrade_extraction"
                        ],
                        "fbti_response": [
                            "fbti_response"
                        ],
                        "fbti_interest_type": [
                            "fbti_interest_type"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "value",
                        "function": "toLower",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "value": ""
                        },
                        "value": [
                            "value"
                        ],
                        "formattedString": [
                            "\"value\":value"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "reg_value",
                        "function": "doRegex",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "phrase": "",
                            "regex_str": "",
                            "reg_model": ""
                        },
                        "value": [
                            "value"
                        ],
                        "formattedString": [
                            "\"phrase\":\"value\"",
                            "\"regex_str\":\"[^\\d\\.]\"",
                            "\"reg_model\":\"sub\""
                        ],
                        "[^\\d\\.]": [
                            "[^\\d\\.]"
                        ],
                        "sub": [
                            "sub"
                        ]
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "int type result",
                        "function": "andOr",
                        "logic": "",
                        "showFunctionSelect": false,
                        "showLogicSelect": true,
                        "inputValues": {}
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "reg_value",
                        "var2": "null",
                        "operator": "!=",
                        "internalCondition": "and",
                        "externalCondition": ""
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "reg_value",
                        "var2": "''",
                        "operator": "!=",
                        "internalCondition": "and",
                        "externalCondition": ""
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "reg_value",
                        "var2": "none",
                        "operator": "!=",
                        "internalCondition": "",
                        "externalCondition": ""
                    },
                    {
                        "type": "If",
                        "depth": 0,
                        "var1": "int type result",
                        "var2": "True",
                        "operator": "==",
                        "internalCondition": "",
                        "externalCondition": ""
                    },
                    {
                        "type": "Then",
                        "depth": 0,
                        "variableName": "",
                        "function": "",
                        "selectedValues": [],
                        "formattedString": "",
                        "enteredValue": ""
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "float_value",
                        "function": "doTypeConversion",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "value": "",
                            "data_type": ""
                        },
                        "reg_value": [
                            "reg_value"
                        ],
                        "formattedString": [
                            "\"value\":reg_value",
                            "\"data_type\":\"float\""
                        ],
                        "float": [
                            "float"
                        ]
                    },
                    {
                        "type": "Print",
                        "depth": 1,
                        "var": "float_value"
                    },
                    {
                        "type": "Else",
                        "depth": 0,
                        "variableName": "",
                        "function": "",
                        "selectedValues": [],
                        "formattedString": "",
                        "enteredValue": ""
                    },
                    {
                        "0": [
                            "0"
                        ],
                        "type": "Set",
                        "depth": 0,
                        "var": "float_value",
                        "function": "doTypeConversion",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "value": "",
                            "data_type": ""
                        },
                        "formattedString": [
                            "\"value\":0",
                            "\"data_type\":\"float\""
                        ],
                        "float": [
                            "float"
                        ]
                    },
                    {
                        "type": "Print",
                        "depth": 1,
                        "var": "float_value"
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "result",
                        "function": "andOr",
                        "logic": "",
                        "showFunctionSelect": false,
                        "showLogicSelect": true,
                        "inputValues": {}
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "float_value",
                        "var2": "float_variance",
                        "operator": "+",
                        "internalCondition": "",
                        "externalCondition": ""
                    },
                    {
                        "type": "Set",
                        "depth": 0,
                        "var": "result",
                        "function": "doTypeConversion",
                        "logic": "",
                        "showFunctionSelect": true,
                        "showLogicSelect": false,
                        "inputValues": {
                            "value": "",
                            "data_type": ""
                        },
                        "result": [
                            "result"
                        ],
                        "formattedString": [
                            "\"value\":result",
                            "\"data_type\":\"float\""
                        ],
                        "float": [
                            "float"
                        ]
                    },
                    {
                        "type": "Print",
                        "depth": 1,
                        "var": "result"
                    },
                    {
                        "type": "doSomething",
                        "depth": 0,
                        "function": "do_something",
                        "var1": "",
                        "var2": ""
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "result_facility",
                        "var2": "True",
                        "operator": "==",
                        "internalCondition": "and",
                        "externalCondition": ""
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "result_entity",
                        "var2": "False",
                        "operator": "==",
                        "internalCondition": "",
                        "externalCondition": ""
                    },
                    {
                        "type": "Return",
                        "depth": 0,
                        "function": "doAssign",
                        "inputValues": {
                            "source": {
                                "selectedValue": "",
                                "input_config": "",
                                "input": "",
                                "input_1": "",
                                "input2": ""
                            },
                            "database": {
                                "ambanketrade_email": "",
                                "ambanketrade_extraction": "",
                                "queues": "",
                                "extraction": ""
                            },
                            "table": {
                                "process_queue": "",
                                "ocr": "",
                                "table34": ""
                            },
                            "column": {
                                "fbti_reference_number_list": "",
                                "mc_blr": ""
                            },
                            "value": {}
                        },
                        "input": [
                            "input"
                        ],
                        "formattedString": [
                            "\"source\":\"input\"",
                            "\"database\":\"extraction\"",
                            "\"table\":\"ocr\"",
                            "\"column\":\"mc_blr\"",
                            "\"value\":result"
                        ],
                        "extraction": [
                            "extraction"
                        ],
                        "ocr": [
                            "ocr"
                        ],
                        "mc_blr": [
                            "mc_blr"
                        ],
                        "result": [
                            "result"
                        ]
                    },
                    {
                        "type": "doSomething",
                        "depth": 0,
                        "function": "do_something2",
                        "var1": "",
                        "var2": ""
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "result_facility",
                        "var2": "True",
                        "operator": "==",
                        "internalCondition": "and",
                        "externalCondition": ""
                    },
                    {
                        "type": "andOr",
                        "depth": 0,
                        "var1": "result_entity",
                        "var2": "True",
                        "operator": "==",
                        "internalCondition": "",
                        "externalCondition": ""
                    },
                    {
                        "type": "Return",
                        "depth": 0,
                        "function": "doAssign",
                        "inputValues": {
                            "source": {
                                "selectedValue": "",
                                "input_config": "",
                                "input": "",
                                "input_1": "",
                                "input2": ""
                            },
                            "database": {
                                "ambanketrade_email": "",
                                "ambanketrade_extraction": "",
                                "queues": "",
                                "extraction": ""
                            },
                            "table": {
                                "process_queue": "",
                                "ocr": "",
                                "table34": ""
                            },
                            "column": {
                                "fbti_reference_number_list": "",
                                "mc_blr": ""
                            },
                            "value": {}
                        },
                        "input": [
                            "input"
                        ],
                        "formattedString": [
                            "\"source\":\"input\"",
                            "\"database\":\"extraction\"",
                            "\"table\":\"ocr\"",
                            "\"column\":\"mc_blr\"",
                            "\"value\":result"
                        ],
                        "extraction": [
                            "extraction"
                        ],
                        "ocr": [
                            "ocr"
                        ],
                        "mc_blr": [
                            "mc_blr"
                        ],
                        "result": [
                            "result"
                        ]
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
  UI_functions: { [key: string]: string[] } = {
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
  'runDateRangeRules': ['FunctionName', 'FieldSource', 'FieldType'],
  'round':[]

  };
  backend_functions: { [key: string]: string[] } = {
    'doCompare': ['string1', 'string2'],
    'doContain_string':['main_string','sub_string'],
    'doRegex': ['phrase', 'regex_str','reg_model'],
    'toLower': ['value'],
    'toUpper': ['string'],
    'doTypeConversion': ['value', 'data_type'],
    'get_data':['source','database','table','column'],
    'doAssign':['source1','database1','table','column'],


    
};
  backend_functions1:any= {
    'doCompare': ['string1', 'string2'],
    'doContain_string': ['main_string', 'sub_string'],
    'doRegex': ['phrase', 'regex_str', 'reg_model'],
    'toLower': ['value'],
    'toUpper': ['string'],
    'doTypeConversion': ['value', 'data_type'],
    "get_data": {
        "source": ["input_config", "input", "input_1", "input2"],
        "database": ["ambanketrade_email", "ambanketrade_extraction"],
        "table": ["fbti_response", "ocr", "table3"],
        "column": ["fbti_reference_number", "facility","entity","fbti_normal_interest_spread","fbti_interest_type","c_bl_reference_number","bl_reference_number"]
    },
    "doAssign":{
        "source" : ["selectedValue","input_config", "input", "input_1", "input2"],
        "database" :["ambanketrade_email", "ambanketrade_extraction","queues","extraction"],
        "table" :  ["process_queue", "ocr", "table34"],
        "column" : ["fbti_reference_number_list", "mc_blr"],
        "value" : [""]
      }
};
  UIfunctionNames = Object.keys(this.UI_functions);
  
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
 