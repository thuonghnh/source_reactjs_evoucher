import * as _action from './action';
import * as _state from './state';

const declarePackageReducer = (state = _state.declarePackageState, action) => {
    switch (action.type) {
        case _action.declarePackageAction.START_GET_EPACKAGE_INFO:
            return {
                ...state,
                epackageInfo: {
                    ...state.epackageInfo,
                    isFetching: true,
                },
            };
        case _action.declarePackageAction.STOP_GET_EPACKAGE_INFO:
            return {
                ...state,
                epackageInfo: {
                    ...state.epackageInfo,
                    isFetching: false,
                    isSuccess: action.isSuccess,
                    isError: !action.isSuccess,
                    errorDiscription: action.errorDiscription,
                    objInfo: action.objInfo,
                },
            };
        case _action.declarePackageAction.START_GET_EPACKAGE_NUM_OF_APP:
            return {
                ...state,
                epackageNumOfApp: {
                    ...state.epackageNumOfApp,
                    isFetching: true,
                },
            };
        case _action.declarePackageAction.STOP_GET_EPACKAGE_NUM_OF_APP:
            return {
                ...state,
                epackageNumOfApp: {
                    ...state.epackageNumOfApp,
                    isFetching: false,
                    isSuccess: action.isSuccess,
                    isError: !action.isSuccess,
                    errorDiscription: action.errorDiscription,
                    dataNumOfApp: action.dataNumOfApp,
                },
            };
        default:
            return state;
    }
};
export { declarePackageReducer };
