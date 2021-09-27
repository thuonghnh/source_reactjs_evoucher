import { apiConstants } from "../../constants";
import { apiBase, fetchApi } from "../../config";
const { API_REQUEST_OAUTH_TOKEN } = apiConstants;


const GET_INFO_USER = "GET_INFO_USER";
const START_REQUEST_TOKEN = "START_REQUEST_TOKEN";
const STOP_REQUEST_TOKEN = "STOP_REQUEST_TOKEN";

export const authAction = {
    GET_INFO_USER,
    START_REQUEST_TOKEN,
    STOP_REQUEST_TOKEN,
}


export const get_info_user = (
    isSuccess,
    isEmty,
    errorDiscription,
    userData
) => {
    return {
        type: GET_INFO_USER,
        isSuccess,
        isEmty,
        errorDiscription,
        userData,
    };
};


export const start_request_token_user = () => {
    return {
        type: START_REQUEST_TOKEN,
    };
}
export const stop_request_token_user = (
    token
) => {
    return {
        type: STOP_REQUEST_TOKEN,
        token
    };
}


export const requestOauthToken = (params) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            // dispatch(start_request_token_user());
            let body = {
                username: params.username,
                userToken: params.userToken
            }
            console.log('body',body)
            apiBase(API_REQUEST_OAUTH_TOKEN, fetchApi.METHOD.POST, body)
                .then((oauthToken) => {
                    resolve(oauthToken);
                    // console.log('token', oauthToken)
                    // dispatch(stop_request_token_user(oauthToken.access_token))
                })
                .catch(error => {
                    reject(error);
                    // console.log('error',error)
                    // dispatch(stop_request_token_user(""))
                })
        })
    }
}