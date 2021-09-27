import { apiConstants } from '../../constants';
import { apiBase, fetchApi } from '../../config';
import { helper } from '../../common';

//api được khai báo ở apiConstants.js
const {
  API_REQUEST_SEARCH_TOKEN,
  API_REQUEST_DELETE_EPACKAGE,
} = apiConstants;

const START_GET_EPACKAGE = 'START_GET_EPACKAGE';
const STOP_GET_EPACKAGE = 'STOP_GET_EPACKAGE';
export const epackageAction = {
  START_GET_EPACKAGE,
  STOP_GET_EPACKAGE,
};

export const startGetEPackage = (data) => {
  return {
    type: START_GET_EPACKAGE,
    data,
  };
};

export const stopGetEPackage = (
  isSuccess,
  dataEpackage = [],
  errorDiscription
) => {
  return {
    type: STOP_GET_EPACKAGE,
    isSuccess,
    dataEpackage,
    errorDiscription,
  };
};

export const getListEpackage = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetEPackage());
      //body cần truyền từ UI xuống
      console.log('body', params);
      apiBase(API_REQUEST_SEARCH_TOKEN, fetchApi.METHOD.POST, params)
        .then((res) => {
          resolve(res.object);
          if (helper.hasProperty(res, 'object') && helper.isArray(res.object) && res.object.length > 0) {
            dispatch(stopGetEPackage(true, res.object, ''));
          } else {
            dispatch(stopGetEPackage(true, [], 'Không tìm thấy thông tin'));
          }
        })
        .catch((error) => {
          reject(error);
          dispatch(stopGetEPackage(false, [], error.msgError));
        });
    });
  };
};

export const deleteEpackageMutil = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // dispatch(startGetEPackage());
      apiBase(API_REQUEST_DELETE_EPACKAGE, fetchApi.METHOD.POST, params)
        .then((res) => {
          resolve(res.object);
        })
        .catch((error) => {
          reject(error);
          // dispatch(stopGetEPackage(false, [], error.msgError));
        });
    });
  };
};
