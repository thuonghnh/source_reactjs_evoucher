import React, { useEffect } from 'react'
import { useAuth } from 'oidc-react';
import { useHistory } from 'react-router-dom';

function SignInOidc(props) {
  const history = useHistory()
  const auth = useAuth()
  useEffect(() => {
    if (auth && auth.userData) {
      history.push('/evoucher-package')
    }
    return () => {
      //cleanup
    }
  }, [])

  return (
    <React.Fragment>
    </React.Fragment>
  )
}

export default SignInOidc;