import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AuthProvider from './AuthProvider'
const App = () => {
    return (
        <Router>
            <Provider store={store} >
                <AuthProvider />
            </Provider>
        </Router>
    )
}

export default App
