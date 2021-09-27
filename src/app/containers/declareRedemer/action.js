import { apiConstants } from '../../constants';
import { apiBase, fetchApi } from '../../config';
import { helper } from '../../common';
const {
  API_GET_COMPANY_BRAND_LIST,
  API_GET_AREA_LIST,
  API_GET_PROVINCE_LIST,
  API_SEARCH_STORE,
  API_GET_BRAND_LIST,
  API_GET_OUTPUT_TYPE_LIST,
  API_GET_MAINGROUP_LIST,
  API_GET_SUBGROUP_LIST,
  API_GET_INVENTORYSTATUS_LIST,
  API_GET_PRODUCT_LIST,
  API_ADD_REDEEMER,
  API_UPDATE_REDEEMER
} = apiConstants;

const START_GET_LIST_REDEEMER = 'START_GET_LIST_REDEEMER';
const STOP_GET_LIST_REDEEMER = 'STOP_GET_LIST_REDEEMER';

export const redeemerAction = {
  START_GET_LIST_REDEEMER,
  STOP_GET_LIST_REDEEMER,
};

export const startGetListRedeemer = (data) => {
  return {
    type: START_GET_LIST_REDEEMER,
    data,
  };
};

export const stopGetListRedeemer = (isSuccess, dataRedeemer = [], errorDiscription) => {
  return {
    type: STOP_GET_LIST_REDEEMER,
    isSuccess,
    dataRedeemer,
    errorDiscription,
  };
};
//update redeemer
export const updateRedeemer = (props) => {
  return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const{
          redeemerId,
          redeemerName,
          lstProvinced,
          lstBrand,
          lstCompanyBrand,
          lstInventoryStatus,
          lstMainGroup,
          lstOutPutType,
          lstProductExclude,
          lstProductInclude,
          lstStore,
          lstSubGroup
        }=props;
            let body={"redeemerId":redeemerId,
                      "redeemerName": redeemerName,
                      "packageId": 0,
                      "lstCritStore":lstStore,
                      "lstCritCompanyBrand":lstCompanyBrand,
                      "lstCritProvinced":lstProvinced,
                      "lstCritOutPutType":lstOutPutType,
                      "lstCritInventoryStatus":lstInventoryStatus,
                      "lstCritMainGroup":lstMainGroup,
                      "lstCritSubGroup":lstSubGroup,
                      "lstCritBrand":lstBrand,
                      "lstCritProductInclude":lstProductInclude,
                      "lstCritProductExclude":lstProductExclude,
                      "createdUser":"administrator",
                    }
          apiBase(API_UPDATE_REDEEMER, fetchApi.METHOD.POST, body)
              .then((res) => {
                  resolve(res.object);
              })
              .catch((error) => {
                  reject(error);
              });
      });
  };
};
//add redeemer
export const addRedeemer = (props) => {
  // console.log(body);
  return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const{
          redeemerName,
          lstProvinced,
          lstBrand,
          lstCompanyBrand,
          lstInventoryStatus,
          lstMainGroup,
          lstOutPutType,
          lstProductExclude,
          lstProductInclude,
          lstStore,
          lstSubGroup
        }=props;
            let body={"redeemerName": redeemerName,
                      "packageId": 0,
                      "lstCritStore":lstStore,
                      "lstCritCompanyBrand":lstCompanyBrand,
                      "lstCritProvinced":lstProvinced,
                      "lstCritOutPutType":lstOutPutType,
                      "lstCritInventoryStatus":lstInventoryStatus,
                      "lstCritMainGroup":lstMainGroup,
                      "lstCritSubGroup":lstSubGroup,
                      "lstCritBrand":lstBrand,
                      "lstCritProductInclude":lstProductInclude,
                      "lstCritProductExclude":lstProductExclude,
                      "createdUser":"administrator",
                    }
          apiBase(API_ADD_REDEEMER, fetchApi.METHOD.POST, body)
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
//Lấy tỉnh thành
export const getProvinceList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let body = params;
      apiBase(API_GET_PROVINCE_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          resolve(res.object);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
//Lấy thương hiệu
export const getCompanyBrandList = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let body = {};
      apiBase(API_GET_COMPANY_BRAND_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          resolve(res.object);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
//lấy khu vực
export const getAreaList = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let body = {};
      apiBase(API_GET_AREA_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          resolve(res.object);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
//lấy kho
export const getStoreList = (body ) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
          apiBase(API_SEARCH_STORE, fetchApi.METHOD.POST, body)
              .then((res) => {
                  resolve(res.object);
              })
              .catch((error) => {
                  reject(error);
              });
      });
  };
};
//lấy brand
export const getBrandList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let body = params;
      apiBase(API_GET_BRAND_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          resolve(res.object);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
//lấy htx
export const getOutputTypeList = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let body = {};
      apiBase(API_GET_OUTPUT_TYPE_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          resolve(res.object);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
export const getMainGroupList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let body = params;
      apiBase(API_GET_MAINGROUP_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          resolve(res.object);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
export const getSubGroupList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let body = params;
      apiBase(API_GET_SUBGROUP_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          resolve(res.object);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
export const getInventoryStatusList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let body = params;
      apiBase(API_GET_INVENTORYSTATUS_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          resolve(res.object);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
export const getProductList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let body = params;
      apiBase(API_GET_PRODUCT_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          resolve(res.object);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};