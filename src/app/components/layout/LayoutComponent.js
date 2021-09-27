import React, { useEffect, useState } from 'react'
import './layout.css'
import { useAuth } from 'oidc-react';
import { helper } from '../../common'
import { constants } from '../../constants';
import * as authAction from "../../containers/login/action";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoadingComponent } from '../../components';
import { useDispatch } from 'react-redux';
import { toast } from '../../common';
const LayoutComponent = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const auth = useAuth()
    const dispatch = useDispatch();
    const { userData } = auth;
    useEffect(() => {
        if (userData) {
            dispatch(authAction.get_info_user(true, false, "", userData))
            let token = helper.getCookie(constants.KEY_TOKEN);
            if (!token || token == "undefined") {
                if (isLoading) return;
                let params = {
                    username: userData.profile.Username,
                    userToken: userData.access_token
                }
                getToken(params);
            }
        }
        return () => {
            //cleanup
        }
    }, [userData])
    const getToken = (params) => {
        setIsLoading(true)
        const { authenActions } = props
        authenActions.requestOauthToken(params)
            .then((response) => {
                setIsLoading(false)
                helper.setCookie(constants.KEY_TOKEN, response.access_token, {})
            })
            .catch((error) => {
                toast.notifyError("Lấy thông tin xác thực: " + error.msgError)
            })
    }
    const signOut = () => {
        helper.removeCookie(constants.KEY_TOKEN)
        auth.signOutRedirect()
    }
    return (
        <React.Fragment>
            {
                userData ?
                    <div className="main-content">
                        <header>
                            <div className="div-header">
                                <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                                <i className="fa fa-bell-o" aria-hidden="true"></i>
                                <div className="user-wrapper">
                                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                    <span>{userData.profile.Fullname}</span>
                                    <div className="dropdown-content">
                                        <button onClick={() => alert('Đang update')}>Thông tin</button>
                                        <button onClick={signOut}>Đăng xuất</button>
                                    </div>
                                </div>
                            </div>
                        </header>
                        {
                            props.children
                        }
                    </div>
                    : null
            }
            <LoadingComponent isLoading={isLoading} />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    authenActions: bindActionCreators(authAction, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);
