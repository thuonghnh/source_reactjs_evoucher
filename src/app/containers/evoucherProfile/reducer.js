import * as _action from './action';
import * as _state from './state';

const packageProfileReducer = (state = _state.packageProfileState, action) => {
  switch (action.type) {
    case _action.packageProfileAction.START_GET_LIST_PROFILE:
      return {
        ...state,
        listProfile: {
          ...state.listProfile,
          isFetching: true,
        },
      };
    case _action.packageProfileAction.STOP_GET_LIST_PROFILE:
      return {
        ...state,
        listProfile: {
          ...state.listProfile,
          isFetching: false,
          isSuccess: action.isSuccess,
          isError: !action.isSuccess,
          errorDiscription: action.errorDiscription,
          dataProfile: action.dataProfile,
        },
      };
    default:
      return state;
  }
};
export { packageProfileReducer };
