import { apiConstants } from '../../constants';
import { apiBase, fetchApi } from '../../config';
import { helper } from '../../common';

const {
    API_GET_LIST_PROFILE,
    API_DELETE_PROFILE,
    API_UPDATE_EXPIRED_PROFILE
} = apiConstants;

const START_GET_LIST_PROFILE = 'START_GET_LIST_PROFILE';
const STOP_GET_LIST_PROFILE = 'STOP_GET_LIST_PROFILE';

export const packageProfileAction = {
    START_GET_LIST_PROFILE,
    STOP_GET_LIST_PROFILE
};

export const startGetListProfile = () => {
    return {
        type: START_GET_LIST_PROFILE,
    };
};

export const stopGetListProfile = (
    isSuccess,
    dataProfile = [],
    errorDiscription
) => {
    return {
        type: STOP_GET_LIST_PROFILE,
        isSuccess,
        dataProfile,
        errorDiscription,
    };
};

//update-expried
export const updateExpriedProfile = (body) => {
    // console.log(body);
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            apiBase(API_UPDATE_EXPIRED_PROFILE, fetchApi.METHOD.POST, body)
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

//delete profile
export const deleteProfile = (body) => {
    // console.log(body);
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            apiBase(API_DELETE_PROFILE, fetchApi.METHOD.POST, body)
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

export const getListProfile = (body) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            console.log(body)
            dispatch(startGetListProfile());
            apiBase(API_GET_LIST_PROFILE, fetchApi.METHOD.POST, body)
                .then((res) => {
                    console.log(res)
                    resolve(res.object);
                    if (helper.hasProperty(res, 'object') && helper.isArray(res.object) && res.object.length > 0) {
                        dispatch(stopGetListProfile(true, res.object, ''));
                    } else {
                        dispatch(stopGetListProfile(true, [], 'Không tìm thấy thông tin'));
                    }
                })
                .catch((error) => {
                    reject(error);
                    dispatch(stopGetListProfile(false, [], error.msgError));
                });
        });
    };
};
