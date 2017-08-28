import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from '@extjs/ext-react';   
import { Cartesian } from '@extjs/ext-react-charts';
import { connect } from 'react-redux';
import { graphql, createFragmentContainer } from 'react-relay';
import { avgBy } from './util/data';

Ext.require([
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.series.Line',
]);

class EmployeesChart extends Component {

    static propTypes = {
        employees: PropTypes.object
    };

    render() {
        const { employees, ...chartProps } = this.props;

        return (
            <Panel layout="fit" {...chartProps}>
                <Cartesian
                    captions={{
                        title: 'Avg Rating by Years Active'
                    }}
                    shadow
                    insetPadding="40 40 60 40"
                    store={avgBy(employees && employees.records, 'yearsActive', 'rating')}
                    series={{
                        type: 'line',
                        xField: 'yearsActive',
                        yField: 'rating',
                    }}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: 'rating',
                        title: 'Avg. Rating'
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: 'yearsActive',
                        title: 'Years Active'
                    }]}
                />
            </Panel>
        )
    }
}

export default connect(state => state.employees)(
    createFragmentContainer(EmployeesChart, 
        graphql`
            fragment EmployeesChart_employees on EmployeesResult {
                records {
                    yearsActive
                    rating
                }
            }
        `
    )
);