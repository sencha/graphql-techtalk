import React from 'react';
import PropTypes from 'prop-types';
import { TitleBar, Button, Container } from '@extjs/ext-react';
import { connect } from 'react-redux';
import { toggleOptions } from './actions';
import EmployeesGrid from './EmployeesGrid';
import EmployeesChart from './EmployeesChart';
import SearchOptions from './SearchOptions';

Ext.require('Ext.panel.Resizer');

function Layout({ dispatch, showOptions }) {
    return (
        <Container layout="fit">
            <TitleBar title="ExtReact Apollo Example" docked="top">
                <Button align="left" iconCls="x-fa fa-bars" handler={() => dispatch(toggleOptions())}/>
            </TitleBar>
            <SearchOptions docked="left" hidden={!showOptions}/>
            <Container layout="vbox">
                <EmployeesGrid flex={1}/>
                {/* <EmployeesChart flex={1} resizable={{ split: true, edges: 'north' }}/> */}
            </Container>
        </Container>
    )
}

Layout.propTypes = {
    showOptions: PropTypes.bool
};

export default connect(state => state.employees)(Layout);
