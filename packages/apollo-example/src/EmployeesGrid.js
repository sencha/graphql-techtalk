import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Column, Toolbar, SearchField, Button, RendererCell } from '@extjs/ext-react';
import { connect } from 'react-redux';
import { updateCriteria } from './actions';
import { gql, graphql } from 'react-apollo';

Ext.require('Ext.Function');

class EmployeesGrid extends Component {

    static propTypes = {
        criteria: PropTypes.object,
        data: PropTypes.object
    };

    search = Ext.Function.createBuffered(() => {
        this.props.dispatch(
            updateCriteria({ text: this.refs.query.getValue() })
        );
    }, 250);

    render() {
        const { data: { employees, refetch, loading }, ...gridProps } = this.props;

        return (
            <Grid 
                data={employees && employees.records} 
                masked={loading && { message: 'Loading...'}}
                {...gridProps}
            >
                <Toolbar docked="top">
                    <SearchField 
                        ref="query" 
                        ui="faded"
                        width="200" 
                        onChange={this.search} 
                        placeholder="Find by name..." 
                    />
                    <Button handler={() => refetch()} iconCls="x-fa fa-refresh"/>
                </Toolbar>
                <Column text="ID" dataIndex="id" width={50}/>
                <Column text="First Name" dataIndex="firstName" width={200}/>
                <Column text="Last Name" dataIndex="lastName" width={200}/>
                <Column text="Date of Birth" dataIndex="dateOfBirth" width={200}/>
                <Column text="Active" dataIndex="active"/>
                <Column text="Years Active" dataIndex="yearsActive"/>
                <Column text="Rating" dataIndex="rating"/>
                <Column text="Gender" dataIndex="gender"/>
                <Column text="now" dataIndex="now" renderer={dateRenderer}/>
            </Grid>
        )
    }

}

const dateRenderer = Ext.util.Format.dateRenderer('g:i:s a');

const query = gql`
    query Employees($filters: [Filter]) {
        employees(filters: $filters) {
            total,
            records {
                id
                firstName
                lastName
                dateOfBirth
                active
                yearsActive
                rating
                gender
                now
            }
        }
    }
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
    withEmployeesQuery(EmployeesGrid)
)
