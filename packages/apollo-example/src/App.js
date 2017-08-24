import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import Layout from './Layout';
import { ApolloClient, ApolloProvider } from 'react-apollo';

const client = new ApolloClient();

const store = createStore(
    combineReducers({
        employees: reducer,
        apollo: client.reducer()
    }),
    {
        employees: {
            showOptions: true,
            criteria: { }
        }
    }, 
    compose(
        applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);

export default function App() {
    return (
        <ApolloProvider store={store} client={client}>
            <Provider store={store}>
                <Layout/>
            </Provider>
        </ApolloProvider>
    )
}

