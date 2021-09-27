import { apiConstants } from '../../constants';
import { apiBase, fetchApi } from '../../config';
import { helper } from '../../common';

const {
    API_PROFILE_GET_INFO,
    API_ADD_PROFILE,
    API_UPDATE_PROFILE
} = apiConstants;

const START_GET_PROFILE_INFO = 'START_GET_PROFILE_INFO';
const STOP_GET_PROFILE_INFO = 'STOP_GET_PROFILE_INFO';

export const declareProfileAction = {
    START_GET_PROFILE_INFO,
    STOP_GET_PROFILE_INFO
};

export const startGetEPackageInfo = () => {
    return {
        type: START_GET_PROFILE_INFO,
    };
};

export const stopGetEPackageInfo = (
    isSuccess,
    objInfo = {},
    errorDiscription
) => {
    return {
        type: STOP_GET_PROFILE_INFO,
        isSuccess,
        objInfo,
        errorDiscription,
    };
};

//lấy thông tin profile
export const getProfileInfo = (packageProfileId) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch(startGetEPackageInfo());
            //body cần truyền từ UI xuống
            let body = {
                packageProfileId: packageProfileId
            }
            console.log(body)
            apiBase(API_PROFILE_GET_INFO, fetchApi.METHOD.POST, body)
                .then((res) => {
                    resolve(res.object);
                    // if (helper.hasProperty(res, 'object')) {
                    //     dispatch(stopGetEPackageInfo(true, res.object, ''));
                    // } else {
                    //     dispatch(stopGetEPackageInfo(true, {}, 'Không tìm thấy thông tin'));
                    // }
                })
                .catch((error) => {
                    reject(error);
                    // dispatch(stopGetEPackageInfo(false, {}, error.msgError));
                });
        });
    };
};

//add profile
export const addProfile = (body) => {
    // console.log(body);
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            apiBase(API_ADD_PROFILE, fetchApi.METHOD.POST, body)
                .then((res) => {
                    resolve(res.object);
                })
                .catch((error) => {
                    // console.log(error);
                    reject(error);
                });
        });
    };
};

//update profile
export const updateProfile = (body) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            apiBase(API_UPDATE_PROFILE, fetchApi.METHOD.POST, body)
                .then((res) => {
                    resolve(res.object);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
};