import { apiConstants } from '../../constants';
import { apiBase, fetchApi } from '../../config';
import { helper } from '../../common';

const {
    API_GET_LIST_REDEEMER,
    API_GET_COMPANY_LIST,
    API_GET_COMPANY_BRAND_LIST,
    API_GET_PROVINCE_LIST,
    API_GET_OUTPUT_TYPE_LIST,
    API_EPACKAGE_GET_INFO,
    API_EPACKAGE_GET_NUMOFAPP,
    API_ADD_EPACKAGE,
    API_UPDATE_EPACKAGE,
    API_REQUEST_CHECK_CHARACTER,
    API_REQUEST_GENCHARACTER
} = apiConstants;

const START_GET_EPACKAGE_INFO = 'START_GET_EPACKAGE_INFO';
const STOP_GET_EPACKAGE_INFO = 'STOP_GET_EPACKAGE_INFO';
const START_GET_EPACKAGE_NUM_OF_APP = 'START_GET_EPACKAGE_NUM_OF_APP';
const STOP_GET_EPACKAGE_NUM_OF_APP = 'STOP_GET_EPACKAGE_NUM_OF_APP';

export const declarePackageAction = {
    START_GET_EPACKAGE_INFO,
    STOP_GET_EPACKAGE_INFO,
    START_GET_EPACKAGE_NUM_OF_APP,
    STOP_GET_EPACKAGE_NUM_OF_APP,
};

export const startGetEPackageInfo = () => {
    return {
        type: START_GET_EPACKAGE_INFO,
    };
};

export const stopGetEPackageInfo = (
    isSuccess,
    objInfo = {},
    errorDiscription
) => {
    return {
        type: STOP_GET_EPACKAGE_INFO,
        isSuccess,
        objInfo,
        errorDiscription,
    };
};

export const startGetEPackageNumOfApp = () => {
    return {
        type: START_GET_EPACKAGE_NUM_OF_APP,
    };
};

export const stopGetEPackageNumOfApp = (
    isSuccess,
    dataNumOfApp = {},
    errorDiscription
) => {
    return {
        type: STOP_GET_EPACKAGE_NUM_OF_APP,
        isSuccess,
        dataNumOfApp,
        errorDiscription,
    };
};

//Lấy danh sách bộ điều kiện áp dụng 
export const getListRedeemer = (packageId) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let body = {
                packageId: packageId
            }
            console.log(body)
            apiBase(API_GET_LIST_REDEEMER, fetchApi.METHOD.POST, body)
                .then((res) => {
                    resolve(res.object);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
};


//lấy thông tin epackage
export const getEpackageInfo = (packageId) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch(startGetEPackageInfo());
            //body cần truyền từ UI xuống
            let body = {
                packageId: packageId
            }
            console.log(body)
            apiBase(API_EPACKAGE_GET_INFO, fetchApi.METHOD.POST, body)
                .then((res) => {
                    resolve(res.object);
                    if (helper.hasProperty(res, 'object')) {
                        dispatch(stopGetEPackageInfo(true, res.object, ''));
                    } else {
                        dispatch(stopGetEPackageInfo(true, {}, 'Không tìm thấy thông tin'));
                    }
                })
                .catch((error) => {
                    reject(error);
                    dispatch(stopGetEPackageInfo(false, {}, error.msgError));
                });
        });
    };
};
//lấy số lần áp dụng

export const getEpackageNumOfApp = (packageId) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch(startGetEPackageNumOfApp());
            //body cần truyền từ UI xuống
            let body = {
                packageId: packageId
            }
            apiBase(API_EPACKAGE_GET_NUMOFAPP, fetchApi.METHOD.POST, body)
                .then((res) => {
                    if (helper.hasProperty(res, 'object')) {
                        resolve(res.object);
                        dispatch(stopGetEPackageNumOfApp(true, res.object, ''));
                    } else {
                        resolve({});
                        dispatch(stopGetEPackageNumOfApp(true, {}, 'Không tìm thấy thông tin'));
                    }
                })
                .catch((error) => {
                    reject(error);
                    dispatch(stopGetEPackageNumOfApp(false, {}, error.msgError));
                });
        });
    };
};


//add epackage
export const addEpackage = (body) => {
    // console.log(body);
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            apiBase(API_ADD_EPACKAGE, fetchApi.METHOD.POST, body)
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

//update epackage
export const updateEpackage = (body) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            apiBase(API_UPDATE_EPACKAGE, fetchApi.METHOD.POST, body)
                .then((res) => {
                    resolve(res.object);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
};


export const checkPartenCharacterEpackage = (pattern) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            //body cần truyền từ UI xuống
            let body = {
                pattern: pattern
            };
            console.log('body', body);
            apiBase(API_REQUEST_CHECK_CHARACTER, fetchApi.METHOD.POST, body)
                .then((res) => {
                    console.log('res', res);
                    resolve(res.object);
                })
                .catch((error) => {
                    reject(error);
                    console.log('res', error);
                });
        });
    };
};

export const genCharacterEpackage = (params) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            //body cần truyền từ UI xuống
            console.log('body', params);
            apiBase(API_REQUEST_GENCHARACTER, fetchApi.METHOD.POST, params)
                .then((res) => {
                    resolve(res.object);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
};