import * as _action from './action';
import * as _state from './state';

const cacheReducer = (state = _state.cacheState, action) => {
    switch (action.type) {
        case _action.cacheAction.START_GET_COMPANY_LIST:
            return {
                ...state,
                company: {
                    ...state.company
                },
            };
        case _action.cacheAction.STOP_GET_COMPANY_LIST:
            return {
                ...state,
                company: {
                    ...state.company,
                    data: action.data,
                },
            };
        case _action.cacheAction.START_GET_COMPANY_BRAND_LIST:
            return {
                ...state,
                companyBrand: {
                    ...state.companyBrand
                },
            };
        case _action.cacheAction.STOP_GET_COMPANY_BRAND_LIST:
            return {
                ...state,
                companyBrand: {
                    ...state.companyBrand,
                    data: action.data,
                },
            };
        case _action.cacheAction.START_GET_PROVINCE_LIST:
            return {
                ...state,
                province: {
                    ...state.province
                },
            };
        case _action.cacheAction.STOP_GET_PROVINCE_LIST:
            return {
                ...state,
                province: {
                    ...state.province,
                    data: action.data,
                },
            };
        case _action.cacheAction.START_GET_OUTPUT_TYPE_LIST:
            return {
                ...state,
                outputType: {
                    ...state.outputType
                },
            };
        case _action.cacheAction.STOP_GET_OUTPUT_TYPE_LIST:
            return {
                ...state,
                outputType: {
                    ...state.outputType,
                    data: action.data,
                },
            };
        case _action.cacheAction.START_GET_AREA_LIST:
            return {
                ...state,
                area: {
                    ...state.area
                },
            };
        case _action.cacheAction.STOP_GET_AREA_LIST:
            return {
                ...state,
                area: {
                    ...state.area,
                    data: action.data,
                },
            };
        case _action.cacheAction.START_GET_STORE_LIST:
            return {
                ...state,
                store: {
                    ...state.store
                },
            };
        case _action.cacheAction.STOP_GET_STORE_LIST:
            return {
                ...state,
                store: {
                    ...state.store,
                    data: action.data,
                },
            };
        case _action.cacheAction.START_GET_BRAND_LIST:
            return {
                ...state,
                brand: {
                    ...state.brand
                },
            };
        case _action.cacheAction.STOP_GET_BRAND_LIST:
            return {
                ...state,
                brand: {
                    ...state.brand,
                    data: action.data,
                },
            };
        case _action.cacheAction.START_GET_MAINGROUP_LIST:
            return {
                ...state,
                maingroup: {
                    ...state.maingroup
                },
            };
        case _action.cacheAction.STOP_GET_MAINGROUP_LIST:
            return {
                ...state,
                maingroup: {
                    ...state.maingroup,
                    data: action.data,
                },
            };
        case _action.cacheAction.START_GET_SUBGROUP_LIST:
            return {
                ...state,
                subgroup: {
                    ...state.subgroup
                },
            };
        case _action.cacheAction.STOP_GET_SUBGROUP_LIST:
            return {
                ...state,
                subgroup: {
                    ...state.subgroup,
                    data: action.data,
                },
            };
        case _action.cacheAction.START_GET_PRODUCT_LIST:
            return {
                ...state,
                product: {
                    ...state.product
                },
            };
        case _action.cacheAction.STOP_GET_PRODUCT_LIST:
            return {
                ...state,
                product: {
                    ...state.product,
                    data: action.data,
                },
            };
        case _action.cacheAction.START_GET_INVENTORY_STATUS_LIST:
            return {
                ...state,
                inventoryStatus: {
                    ...state.inventoryStatus
                },
            };
        case _action.cacheAction.STOP_GET_INVENTORY_STATUS_LIST:
            return {
                ...state,
                inventoryStatus: {
                    ...state.inventoryStatus,
                    data: action.data,
                },
            };
        default:
            return state;
    }
};
export { cacheReducer };