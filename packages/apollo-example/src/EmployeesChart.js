import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from '@extjs/ext-react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

Ext.require('Ext.Function');

class EmployeesChart extends Component {

    render() {
        // const { data: { employees, refetch, loading }, ...chartProps } = this.props;
        const { ...chartProps } = this.props;
        return <Panel {...chartProps}>Chart</Panel>
    }

}

export default connect(state => state.employees)(EmployeesChart)