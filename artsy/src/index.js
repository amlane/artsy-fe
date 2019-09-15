import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';

const store = createStore(
    rootReducer, // this is the most basic reducer. A function that returns and object. Replace it.
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

