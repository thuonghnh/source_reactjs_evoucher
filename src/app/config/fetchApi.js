import { helper } from '../common';
import { constants } from '../constants'


// const code_expried = 401;
const code_success = 200;
// const code_token_expried = 1001;
// const code_token_invalid = 1002; //Client set token invalid with status 403
const code_internal_server_error = 500;
const ONE_SECOND = 1000;


// const TIME_OUT = (Config.ENV == "staging" || Config.ENV == "production") ? ONE_SECOND * 10 : ONE_SECOND * 100;
const TIME_OUT = ONE_SECOND * 60;
// const TIME_OUT = ONE_SECOND * 1000;

// const messageTokenExpried = "Authorization has been denied for this request.";
// const messageTokenInvalid = "invalid_grant";
export const TOKEN_EXPRIED = "TOKEN_EXPRIED";
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

const CONTENT_TYPE = 'content-type';
const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded';
const CONTENT_TYPE_JSON = 'application/json';
const ACCEPT = "accept";
const AUTHORIZATION = 'authorization';

export const HEADER = {
    CONTENT_TYPE,
    CONTENT_TYPE_FORM,
    CONTENT_TYPE_JSON
}

export const METHOD = {
    GET,
    POST,
    PUT,
    DELETE
}

/**
* Timeout function
* @param {Integer} time (miliseconds)
* @param {Promise} promise
*/
const timeout = (time, promise) => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            return reject({
                status: 0,
                requestTimeout: true,
                ok: false,
                statusText: "Xin lỗi, không có phản hồi từ hệ thống. Vui lòng kiểm tra lại mạng di động, wifi hoặc liên hệ bên hệ thống.",//translate("fetchAPI.error_time_out"),
                body: {}
            });
        }, time);
        promise.then(resolve, reject);
    });
}
// function appendHeader(params, headers) {
//     let keys = Object.keys(params);
//     for (let i = 0; i < keys.length; i++) {
//         const key = keys[i];
//         if (headers.has(key)) {
//             headers.map[key] = params[key];
//         } else {
//             headers.append(key, params[key]);
//         }
//     }
// }
function getQueryString(params) {
    var esc = encodeURIComponent;
    return Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
}

const checkStatus = response => {
    // console.log('resstatus', response)
    if (response.status >= code_success && response.status < 300) {
        return response;
    }

    return response.json().then(json => {
        return Promise.reject({
            status: response.status,
            ok: false,
            statusText: response.statusText,
            body: json
        });
    });
}
const parseJSON = response => {
    // console.log("status response: ", response.status);
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
};

const handleError = error => {
    // console.log("error : ", error);
    if (helper.hasProperty(error, "requestTimeout") && error.requestTimeout) {
        return Promise.reject(error);
    }

    return Promise.reject({
        status: 0,
        ok: false,
        statusText: "Không thể kết nối. Vui lòng kiểm tra lại dữ liệu hoặc wifi.",//translate("fetchAPI.error_connect"),
        body: {}
    });
}

export default function apiBase(url, method, body, options = { setTimeOut: TIME_OUT, oauthToken: false, customHeader: {} }) {
    return new Promise((resolve, reject) => {

        let token = helper.getCookie(constants.KEY_TOKEN);

        // Create an instance.
        const controller = new AbortController();
        const signal = controller.signal;

        let headers = new Headers();
        if (options.oauthToken) {
            headers = options.customHeader;
        } else {
            let params;
            if (token && token != "undefined") {
                // let authen = 'Bearer ' + token;
                // headers.append(AUTHORIZATION, authen);
                params = {
                    [ACCEPT]: CONTENT_TYPE_JSON,
                    [CONTENT_TYPE]: CONTENT_TYPE_JSON,
                    [AUTHORIZATION]: 'Bearer ' + token
                }
            }else{
                params = {
                    [ACCEPT]: CONTENT_TYPE_JSON,
                    [CONTENT_TYPE]: CONTENT_TYPE_JSON
                }
            }
            headers = params;
            // appendHeader(params, headers);
        }

        /**Configure Body */
        // console.log("Header for request: ", headers);
        switch (method) {
            case METHOD.GET: {
                //append params into url
                if (helper.IsValidateObject(options.params)) {
                    url += getQueryString(options.params);
                }
            }
                break;
            case METHOD.POST:
                if (helper.IsValidateObject(headers) && headers[CONTENT_TYPE]) {
                    if (headers[CONTENT_TYPE] === CONTENT_TYPE_FORM) {
                        body = getQueryString(body);
                    } else if (headers[CONTENT_TYPE] === CONTENT_TYPE_JSON) {
                        //add json object into body
                        body = JSON.stringify(body);
                    }
                }
                break;
            default:
                break;
        }
        console.log("Body for request: ", body);
        let objRequest = {
            signal: signal,
            method: method,
            headers: headers,
            body: body  // <-- Post parameters
        }
        // console.log("Object for request: ", url, objRequest);
        timeout(
            options.setTimeOut ? options.setTimeOut : TIME_OUT,
            fetch(url, objRequest))
            .catch(handleError) // handle network issues
            .then(checkStatus)
            .then(parseJSON)
            .then(json => {
                // console.log("json response: ", json);
                if (helper.hasProperty(json, "error")) {
                    let error = json.error;
                    if (error) {
                        if (helper.hasProperty(json, "errorReason")) {

                            if (helper.hasProperty(json, "errorType")) {
                                reject({
                                    status: 0,
                                    ok: false,
                                    msgError: json.errorReason,
                                    typeError: json.errorType,
                                    body: {}
                                });
                            }
                            else {
                                reject({
                                    status: 0,
                                    ok: false,
                                    msgError: json.errorReason,
                                    body: {}
                                });
                            }
                        }
                    }
                }

                resolve(json);
            })
            .catch((error) => {
                // This can be because of request timed out 
                // so we abort the request for any case
                // controller.abort();
                // console.log("fetchi api error: ", error);
                let errorStatus = helper.hasProperty(error, "status") ? error.status : -1;
                if (errorStatus === 0) {
                    let newError = {
                        statusCode: 0,
                        msgError: error.statusText
                    }
                    reject(newError);
                }

                if (errorStatus === code_internal_server_error) {
                    let newError = {
                        statusCode: 0,
                        msgError: "Sever đang bảo trì hoặc đang mất kết nối. Vui lòng thử lại sau !"//translate("fetchAPI.error_server")
                    }
                    reject(newError);
                }


                if (helper.hasProperty(error, "body")) {
                    let msgError = "";
                    if (helper.hasProperty(error.body, "status")) msgError += "error status " + error.body.status + "\n"
                    if (helper.hasProperty(error.body, "error") || helper.hasProperty(error.body, "error_description")) {

                        if (error.body.error_description && error.body.error_description.length > 0) {
                            msgError += error.body.error_description + "\n"
                        } else {
                            msgError += error.body.error + "\n"
                        }
                    }

                    if (helper.hasProperty(error.body, "exception")) msgError += "exception " + error.body.exception + "\n"
                    if (helper.hasProperty(error.body, "message")) msgError += "message " + error.body.message;
                    if (helper.hasProperty(error.body, "errorReason")) msgError = error.body.errorReason;
                    let newError = {
                        statusCode: msgError.status ? msgError.status : errorStatus,
                        msgError: msgError
                    }
                    reject(newError);
                }
                let newError = {
                    statusCode: errorStatus,
                    msgError: "Không thể lấy dữ liệu từ hệ thống!"//translate("fetchAPI.error_get_data")
                }
                reject(newError);
            })
    });
}