import { apiConstants } from '../../constants';
import { apiBase, fetchApi } from '../../config';
import { helper } from '../../common';

const {
  API_GET_COMPANY_LIST,
  API_GET_COMPANY_BRAND_LIST,
  API_GET_PROVINCE_LIST,
  API_GET_OUTPUT_TYPE_LIST,
  API_GET_AREA_LIST,
  API_SEARCH_STORE,
  API_GET_BRAND_LIST,
  API_GET_MAINGROUP_LIST,
  API_GET_SUBGROUP_LIST,
  API_GET_INVENTORYSTATUS_LIST,
  API_GET_PRODUCT_LIST,
} = apiConstants;

const START_GET_COMPANY_LIST = 'START_GET_COMPANY_LIST';
const STOP_GET_COMPANY_LIST = 'STOP_GET_COMPANY_LIST';
const START_GET_COMPANY_BRAND_LIST = 'START_GET_COMPANY_BRAND_LIST';
const STOP_GET_COMPANY_BRAND_LIST = 'STOP_GET_COMPANY_BRAND_LIST';
const START_GET_PROVINCE_LIST = 'START_GET_PROVINCE_LIST';
const STOP_GET_PROVINCE_LIST = 'STOP_GET_PROVINCE_LIST';
const START_GET_OUTPUT_TYPE_LIST = 'START_GET_OUTPUT_TYPE_LIST';
const STOP_GET_OUTPUT_TYPE_LIST = 'STOP_GET_OUTPUT_TYPE_LIST';
const START_GET_AREA_LIST = 'START_GET_AREA_LIST';
const STOP_GET_AREA_LIST = 'STOP_GET_AREA_LIST';
const START_GET_STORE_LIST = 'START_GET_STORE_LIST';
const STOP_GET_STORE_LIST = 'STOP_GET_STORE_LIST';
const START_GET_BRAND_LIST = 'START_GET_BRAND_LIST';
const STOP_GET_BRAND_LIST = 'STOP_GET_BRAND_LIST';
const START_GET_MAINGROUP_LIST = 'START_GET_MAINGROUP_LIST';
const STOP_GET_MAINGROUP_LIST = 'STOP_GET_MAINGROUP_LIST';
const START_GET_SUBGROUP_LIST = 'START_GET_SUBGROUP_LIST';
const STOP_GET_SUBGROUP_LIST = 'STOP_GET_SUBGROUP_LIST';
const START_GET_PRODUCT_LIST = 'START_GET_PRODUCT_LIST';
const STOP_GET_PRODUCT_LIST = 'STOP_GET_PRODUCT_LIST';
const START_GET_INVENTORY_STATUS_LIST = 'START_GET_INVENTORY_STATUS_LIST';
const STOP_GET_INVENTORY_STATUS_LIST = 'STOP_GET_INVENTORY_STATUS_LIST';

export const cacheAction = {
  START_GET_COMPANY_LIST,
  STOP_GET_COMPANY_LIST,
  START_GET_COMPANY_BRAND_LIST,
  STOP_GET_COMPANY_BRAND_LIST,
  START_GET_PROVINCE_LIST,
  STOP_GET_PROVINCE_LIST,
  START_GET_OUTPUT_TYPE_LIST,
  STOP_GET_OUTPUT_TYPE_LIST,
  START_GET_AREA_LIST,
  STOP_GET_AREA_LIST,
  START_GET_STORE_LIST,
  STOP_GET_STORE_LIST,
  START_GET_BRAND_LIST,
  STOP_GET_BRAND_LIST,
  START_GET_MAINGROUP_LIST,
  STOP_GET_MAINGROUP_LIST,
  START_GET_SUBGROUP_LIST,
  STOP_GET_SUBGROUP_LIST,
  START_GET_PRODUCT_LIST,
  STOP_GET_PRODUCT_LIST,
  START_GET_INVENTORY_STATUS_LIST,
  STOP_GET_INVENTORY_STATUS_LIST,
};

//công ty
export const startGetCompanyList = () => {
  return {
    type: START_GET_COMPANY_LIST,
  };
};

export const stopGetCompanyList = (data) => {
  return {
    type: STOP_GET_COMPANY_LIST,
    data,
  };
};

//thương hiệu
export const startGetCompanyBrandList = () => {
  return {
    type: START_GET_COMPANY_BRAND_LIST,
  };
};

export const stopGetCompanyBrandList = (data) => {
  return {
    type: STOP_GET_COMPANY_BRAND_LIST,
    data,
  };
};

//Tỉnh thành
export const startGetProvinceList = () => {
  return {
    type: START_GET_PROVINCE_LIST,
  };
};

export const stopGetProvinceList = (data) => {
  return {
    type: STOP_GET_PROVINCE_LIST,
    data,
  };
};

//hình thức xuất
export const startGetOutputTypeList = () => {
  return {
    type: START_GET_OUTPUT_TYPE_LIST,
  };
};

export const stopGetOutputTypeList = (data) => {
  return {
    type: STOP_GET_OUTPUT_TYPE_LIST,
    data,
  };
};

//khu
export const startGetAreaList = () => {
  return {
    type: START_GET_AREA_LIST,
  };
};

export const stopGetAreaList = (data) => {
  return {
    type: STOP_GET_AREA_LIST,
    data,
  };
};

//kho
export const startGetStoreList = () => {
  return {
    type: START_GET_STORE_LIST,
  };
};

export const stopGetStoreList = (data) => {
  return {
    type: STOP_GET_STORE_LIST,
    data,
  };
};

//brand
export const startGetBrandList = () => {
  return {
    type: START_GET_BRAND_LIST,
  };
};

export const stopGetBrandList = (data) => {
  return {
    type: STOP_GET_BRAND_LIST,
    data,
  };
};

//ngành hàng
export const startGetMaingroupList = () => {
  return {
    type: START_GET_MAINGROUP_LIST,
  };
};

export const stopGetMaingroupList = (data) => {
  return {
    type: STOP_GET_MAINGROUP_LIST,
    data,
  };
};

//nhóm Hàng
export const startGetSubgroupList = () => {
  return {
    type: START_GET_SUBGROUP_LIST,
  };
};

export const stopGetSubgroupList = (data) => {
  return {
    type: STOP_GET_SUBGROUP_LIST,
    data,
  };
};

//sản Phẩm
export const startGetProductList = () => {
  return {
    type: START_GET_PRODUCT_LIST,
  };
};

export const stopGetProductList = (data) => {
  return {
    type: STOP_GET_PRODUCT_LIST,
    data,
  };
};

//trạng thái
export const startGetInventoryStatusList = () => {
  return {
    type: START_GET_INVENTORY_STATUS_LIST,
  };
};

export const stopGetInventoryStatusList = (data) => {
  return {
    type: STOP_GET_INVENTORY_STATUS_LIST,
    data,
  };
};

//Lấy công ty
export const getCompanyList = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetCompanyList());
      let body = {
        // languageId: 2
      };
      apiBase(API_GET_COMPANY_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetCompanyList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetCompanyList([]));
          reject(error);
        });
    });
  };
};
//Lấy tỉnh thành
export const getProvinceList = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetProvinceList());
      let body = {
        // languageId: 2
      };
      apiBase(API_GET_PROVINCE_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetProvinceList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetProvinceList([]));
          reject(error);
        });
    });
  };
};

//Lấy thương hiệu
export const getCompanyBrandList = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetCompanyBrandList());
      let body = {
        // languageId: 2
      };
      apiBase(API_GET_COMPANY_BRAND_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetCompanyBrandList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetCompanyBrandList([]));
          reject(error);
        });
    });
  };
};
//Lấy hình thức xuất
export const getOutputTypeList = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetOutputTypeList());
      let body = {
        // languageId: 2
      };
      apiBase(API_GET_OUTPUT_TYPE_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetOutputTypeList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetOutputTypeList([]));
          reject(error);
        });
    });
  };
};

//khu
export const getAreaList = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetAreaList());
      let body = {
        // languageId: 2
      };
      apiBase(API_GET_AREA_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetAreaList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetAreaList([]));
          reject(error);
        });
    });
  };
};

//kho
export const getStoreList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetStoreList());
      let body = {
        languageId: 0,
        // keyWord: params.keyWord,
        brandId: params.brandId,
        areaId: params.areaId,
        pageSize: params.pageSize,
        pageIndex: params.pageIndex,
      };
      apiBase(API_SEARCH_STORE, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetStoreList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetStoreList([]));
          reject(error);
        });
    });
  };
};

//brand
export const getBrandList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetBrandList());
      let body = {
        // "languageId": 1
        keyWord: params.keyWord,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
      };
      apiBase(API_GET_BRAND_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetBrandList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetBrandList([]));
          reject(error);
        });
    });
  };
};

//ngành hàng
export const getMaingroupList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetMaingroupList());
      let body = {
        languageId: 0,
        keyWord: params.keyWord,
      };
      apiBase(API_GET_MAINGROUP_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetMaingroupList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetMaingroupList([]));
          reject(error);
        });
    });
  };
};

//nhóm hàng
export const getSubgroupList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetSubgroupList());
      let body = {
        languageId: 0,
        mainGroupId: params.mainGroupId,
      };
      apiBase(API_GET_SUBGROUP_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetSubgroupList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetSubgroupList([]));
          reject(error);
        });
    });
  };
};

//sản phẩm
export const getProductList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetProductList());
      let body = {
        keyWord: params.keyWord,
        mainGroupId: params.mainGroupId,
        subGroupId: params.subGroupId,
        brandId: params.brandId,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
      };
      apiBase(API_GET_PRODUCT_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetProductList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetProductList([]));
          reject(error);
        });
    });
  };
};

//trạng thái
export const getInventoryStatusList = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(startGetInventoryStatusList());
      let body = {
        languageId: 2,
      };
      apiBase(API_GET_INVENTORYSTATUS_LIST, fetchApi.METHOD.POST, body)
        .then((res) => {
          dispatch(stopGetInventoryStatusList(res.object));
          resolve(res.object);
        })
        .catch((error) => {
          dispatch(stopGetInventoryStatusList([]));
          reject(error);
        });
    });
  };
};
