import React from 'react';
import PropTypes from 'prop-types';
import { TitleBar, Button, Container } from '@extjs/ext-react';
import { connect } from 'react-redux';
import { toggleOptions } from './actions';
import { QueryRenderer } from 'react-relay';
import EmployeesGrid from './EmployeesGrid';
import EmployeesChart from './EmployeesChart';
import SearchOptions from './SearchOptions';
import environment from './relay/environment';

Ext.require('Ext.panel.Resizer');

function Layout({ dispatch, showOptions, criteria }) {
    return (
        <Container layout="fit">
            <TitleBar title="ExtReact Relay Example" docked="top">
                <Button align="left" iconCls="x-fa fa-bars" handler={() => dispatch(toggleOptions())}/>
            </TitleBar>
            <SearchOptions docked="left" hidden={!showOptions}/>
            <QueryRenderer
                environment={environment}
                query={graphql`
                    query LayoutEmployeesGridQuery($filters: [Filter]) {
                        employees(filters: $filters) {
                            ...EmployeesGrid_employees
                            ...EmployeesChart_employees
                        }
                    }
                `}
                render={({ error, props }) => {
                    const { employees } = props || { employees: null };

                    if (error) {
                        return <div>{error.message}</div>;
                    } else {
                        return (
                            <Container layout="vbox" masked={!employees}>
                                <EmployeesGrid 
                                    flex={1} 
                                    employees={employees}
                                />
                                <EmployeesChart 
                                    flex={1} 
                                    employees={employees} 
                                    resizable={{ split: true, edges: 'north' }}
                                />
                            </Container>
                        );
                    }
                }}
                variables={{
                    filters: createFilters(criteria)
                }}
            />
        </Container>
    )
}

Layout.propTypes = {
    showOptions: PropTypes.bool
};

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

export default connect(state => state.employees)(Layout);
