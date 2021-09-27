import React from 'react'
import { AuthProvider as Auth } from 'oidc-react';
import { LayoutComponent } from './components';
import RouterComponent from './router/RouterComponent'
const config = {
    onSignIn: () => {
        // Redirect?
    },
    authority: process.env.REACT_APP_AUTHORITY,
    clientId: process.env.REACT_APP_CLIENTID,
    redirectUri: process.env.REACT_APP_REDIRECTURI,
    responseType: process.env.REACT_APP_RESPONSETYPE,
    scope: process.env.REACT_APP_SCOPE,
    postLogoutRedirectUri: process.env.REACT_APP_POSTLOGOUT,
};

const AuthProvider = () => {
    return (
        <Auth {...config}>
            <LayoutComponent>
                <RouterComponent />
            </LayoutComponent>
        </Auth>
    )
}

export default AuthProvider
