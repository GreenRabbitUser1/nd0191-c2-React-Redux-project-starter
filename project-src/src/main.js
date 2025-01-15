import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import reducers from './reducers/index.js';
import middleware from './middleware/index.js';
import { createStore } from 'redux';

const store = createStore(reducers, middleware);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
