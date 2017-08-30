/**
 * @flow
 * @relayHash 7e11acbdce3aa6b4cf2bb33c00fd1a2c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type LayoutEmployeesGridQueryResponse = {|
  +employees: ?{| |};
|};
*/


/*
query LayoutEmployeesGridQuery(
  $filters: [Filter]
) {
  employees(filters: $filters) {
    ...EmployeesGrid_employees
    ...EmployeesChart_employees
  }
}

fragment EmployeesGrid_employees on EmployeesResult {
  total
  records {
    id
    firstName
    lastName
    dateOfBirth
    active
    gender
  }
}

fragment EmployeesChart_employees on EmployeesResult {
  records {
    yearsActive
    rating
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filters",
        "type": "[Filter]",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LayoutEmployeesGridQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "filters",
            "variableName": "filters",
            "type": "[Filter]"
          }
        ],
        "concreteType": "EmployeesResult",
        "name": "employees",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "EmployeesGrid_employees",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "EmployeesChart_employees",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "LayoutEmployeesGridQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filters",
        "type": "[Filter]",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "LayoutEmployeesGridQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "filters",
            "variableName": "filters",
            "type": "[Filter]"
          }
        ],
        "concreteType": "EmployeesResult",
        "name": "employees",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "total",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Employee",
            "name": "records",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "firstName",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "lastName",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "dateOfBirth",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "active",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "gender",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "yearsActive",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "rating",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query LayoutEmployeesGridQuery(\n  $filters: [Filter]\n) {\n  employees(filters: $filters) {\n    ...EmployeesGrid_employees\n    ...EmployeesChart_employees\n  }\n}\n\nfragment EmployeesGrid_employees on EmployeesResult {\n  total\n  records {\n    id\n    firstName\n    lastName\n    dateOfBirth\n    active\n    gender\n  }\n}\n\nfragment EmployeesChart_employees on EmployeesResult {\n  records {\n    yearsActive\n    rating\n    id\n  }\n}\n"
};

module.exports = batch;
