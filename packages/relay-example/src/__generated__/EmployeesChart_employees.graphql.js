/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type EmployeesChart_employees = {|
  +records: ?$ReadOnlyArray<?{|
    +yearsActive: ?number;
    +rating: ?number;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EmployeesChart_employees",
  "selections": [
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
  "type": "EmployeesResult"
};

module.exports = fragment;
