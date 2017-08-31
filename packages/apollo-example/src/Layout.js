import React from 'react';
import PropTypes from 'prop-types';
import { TitleBar, Button, Container } from '@extjs/ext-react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { toggleOptions } from './actions';
import EmployeesGrid from './EmployeesGrid';
import EmployeesChart from './EmployeesChart';
import SearchOptions from './SearchOptions';

Ext.require('Ext.panel.Resizer');

function Layout({ dispatch, showOptions, data }) {
    return (
        <Container layout="fit">
            <TitleBar title="ExtReact Apollo Example" docked="top">
                <Button align="left" iconCls="x-fa fa-bars" handler={() => dispatch(toggleOptions())}/>
            </TitleBar>
            <SearchOptions docked="left" hidden={!showOptions}/>
            <Container layout="vbox" masked={data.loading}>
                <EmployeesGrid 
                    flex={1} 
                    data={data}
                />
                <EmployeesChart 
                    flex={1} 
                    resizable={{ split: true, edges: 'north' }}
                    data={data}
                /> 
            </Container>
        </Container>
    )
}

Layout.propTypes = {
    showOptions: PropTypes.bool
};

const query = gql`
    query Employees($filters: [Filter]) {
        employees(filters: $filters) {
            ...EmployeesGrid
            ...EmployeesChart
        }
    }
    ${EmployeesGrid.fragment}
    ${EmployeesChart.fragment}
`;

const withEmployeesQuery = graphql(query, {
    options: (props) => ({
        variables: {
            filters: createFilters(props.criteria)
        }
    })
});

function createFilters(criteria) {
    const filters = [];
    let value;

    for (let property in criteria) {
        value = criteria[property];

        if (value != null) {
            filters.push({ property, value });
        }
    }

    return filters;
}

export default connect(state => state.employees)(
    withEmployeesQuery(Layout)
);
