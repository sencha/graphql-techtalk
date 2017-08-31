import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Column, Toolbar, SearchField, Button, RendererCell } from '@extjs/ext-react';
import { connect } from 'react-redux';
import { updateCriteria } from './actions';
import { graphql, createFragmentContainer } from 'react-relay';

Ext.require([
    'Ext.Function'
]);

class EmployeesGrid extends Component {

    static propTypes = {
        criteria: PropTypes.object,
        employees: PropTypes.object
    };

    search = Ext.Function.createBuffered(() => {
        this.props.dispatch(
            updateCriteria({ text: this.refs.query.getValue() })
        );
    }, 250);

    render() {
        const { employees, ...gridProps } = this.props;

        return (
            <Grid 
                data={employees && employees.records} 
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
                </Toolbar>
                <Column text="ID" dataIndex="id" width={50}/>
                <Column text="First Name" dataIndex="firstName" width={200}/>
                <Column text="Last Name" dataIndex="lastName" width={200}/>
                <Column text="Date of Birth" dataIndex="dateOfBirth" width={200} renderer={dateRenderer}/>
                <Column text="Active" dataIndex="active" renderer={activeRenderer}/>
                <Column text="Gender" dataIndex="gender"/>
            </Grid>
        )
    }

}

const dateRenderer = Ext.util.Format.dateRenderer('n/g/Y');
const activeRenderer = active => <div {...styles.active[active]}/>;

const styles = {
    active: {
        true: {
            className: 'x-fa fa-check',
            style: { color: 'green' }
        },
        false: {
            className: 'x-fa fa-close',
            style: { color: 'red' }
        }
    }
};

export default connect(state => state.employees)(
    createFragmentContainer(EmployeesGrid, 
        graphql`
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
        `
    )
);