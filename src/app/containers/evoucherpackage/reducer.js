import * as _action from './action';
import * as _state from './state';

const epackageReducer = (state = _state.epackageState, action) => {
  switch (action.type) {
    case _action.epackageAction.START_GET_EPACKAGE:
      return {
        ...state,
        listEpackage: {
          ...state.listEpackage,
          isFetching: true,
        },
      };
    case _action.epackageAction.STOP_GET_EPACKAGE:
      return {
        ...state,
        listEpackage: {
          ...state.listEpackage,
          isFetching: false,
          isSuccess: action.isSuccess,
          isError: !action.isSuccess,
          errorDiscription: action.errorDiscription,
          dataEpackage: action.dataEpackage,
        },
      };
    default:
      return state;
  }
};
export { epackageReducer };
