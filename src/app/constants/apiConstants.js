// import Config from "react-config";
const HOST = process.env.REACT_APP_HOST;
const API_EVOUCHER = 'api/evoucher/';

const AUTH_SERVICE = 'mwg-app-evoucher-service/';

// export const API_REQUEST_OAUTH_TOKEN    = HOST + AUTH_SERVICE + 'oauth/token';
export const API_REQUEST_OAUTH_TOKEN        = HOST + AUTH_SERVICE + API_EVOUCHER + 'auth';
export const API_REQUEST_SEARCH_TOKEN       = HOST + AUTH_SERVICE + 'api/evoucherpackage/search';
export const API_REQUEST_GENCHARACTER       = HOST + AUTH_SERVICE + 'api/evouchercode/generate';
export const API_REQUEST_CHECK_CHARACTER    = HOST + AUTH_SERVICE + 'api/evouchercode/checkpattern';
export const API_REQUEST_DELETE_EPACKAGE    = HOST + AUTH_SERVICE + 'api/evoucherpackage/delete';

export const API_GET_LIST_REDEEMER          = HOST + AUTH_SERVICE + 'api/evoucher-redeemer/getlist';

export const API_GET_COMPANY_LIST           = HOST + AUTH_SERVICE + 'api/masterdata/getcompanylist';

export const API_EPACKAGE_GET_INFO          = HOST + AUTH_SERVICE + 'api/evoucherpackage/get';
export const API_EPACKAGE_GET_NUMOFAPP      = HOST + AUTH_SERVICE + 'api/evoucherpackage-criteriaconcern/get-list';

export const API_ADD_EPACKAGE               = HOST + AUTH_SERVICE + 'api/evoucherpackage/add';
export const API_UPDATE_EPACKAGE            = HOST + AUTH_SERVICE + 'api/evoucherpackage/update';

export const API_PROFILE_GET_INFO           = HOST + AUTH_SERVICE + 'api/package-profile/info';
export const API_ADD_PROFILE                = HOST + AUTH_SERVICE + 'api/package-profile/add';
export const API_UPDATE_PROFILE             = HOST + AUTH_SERVICE + 'api/package-profile/upd';

export const API_GET_LIST_PROFILE           = HOST + AUTH_SERVICE + 'api/package-profile/search';
export const API_DELETE_PROFILE             = HOST + AUTH_SERVICE + 'api/package-profile/del';
export const API_UPDATE_EXPIRED_PROFILE     = HOST + AUTH_SERVICE + 'api/package-profile/update-expired';

export const API_ADD_REDEEMER               = HOST + AUTH_SERVICE + 'api/evoucher-redeemer/create';
export const API_UPDATE_REDEEMER            = HOST + AUTH_SERVICE + 'api/evoucher-redeemer/upd';
//data cache
export const API_GET_COMPANY_BRAND_LIST = HOST + AUTH_SERVICE + 'api/masterdata/getcompanybrandlist';
export const API_GET_PROVINCE_LIST = HOST + AUTH_SERVICE + 'api/masterdata/getprovincelist';
export const API_GET_OUTPUT_TYPE_LIST = HOST + AUTH_SERVICE + 'api/masterdata/getoutputtypelist';
export const API_GET_AREA_LIST = HOST + AUTH_SERVICE + 'api/masterdata/getarealist';
export const API_SEARCH_STORE = HOST + AUTH_SERVICE + 'api/masterdata/searchstore';
export const API_GET_BRAND_LIST = HOST + AUTH_SERVICE + 'api/masterdata/getbrandlist';

export const API_GET_MAINGROUP_LIST = HOST + AUTH_SERVICE + 'api/masterdata/getmaingrouplist';
export const API_GET_SUBGROUP_LIST = HOST + AUTH_SERVICE + 'api/masterdata/getsubgrouplist';
export const API_GET_INVENTORYSTATUS_LIST = HOST + AUTH_SERVICE + 'api/masterdata/getinventorystatuslist';
export const API_GET_PRODUCT_LIST = HOST + AUTH_SERVICE + 'api/masterdata/searchproduct';
