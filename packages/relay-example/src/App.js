import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import Layout from './Layout';

const store = createStore(
    combineReducers({
        employees: reducer
    }),
    {
        employees: {
            showOptions: true,
            criteria: { }
        }
    }, 
    compose(
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);

export default function App() {
    return (
        <Provider store={store}>
            <Layout/>
        </Provider>
    )
}

