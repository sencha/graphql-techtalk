
import { mean } from 'lodash';

/**
 * Returns a series containing the average of valueField for each value of categoryField
 * @param {Object[]} data 
 * @param {String} categoryField 
 * @param {String} valueField 
 */
export function avgBy(data, categoryField, valueField) {
    if (!data) return [];

    let categories = {},
        results = [];

    for (let record of data) {
        let key = record[categoryField]
        let category = categories[key]

        if (category == null) {
            category = categories[key] = [];
        }

        category.push(record[valueField]);
    }

    for (let key in categories) {
        results.push({ [categoryField]: key, [valueField]: mean(categories[key])});
    }

    return results;
}