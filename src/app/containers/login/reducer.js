import * as _action from "./action";
import * as _state from "./state";

const authReducer = (state = _state.authState, action) => {
  switch (action.type) {
    case _action.authAction.GET_INFO_USER:
      return {
        ...state,
        infoUser: {
          ...state.infoUser,
          isSuccess: action.isSuccess,
          isError: !action.isSuccess,
          errorDiscription: action.errorDiscription,
          userData: action.userData,
        },
      };
    case _action.authAction.START_REQUEST_TOKEN:
      return {
        ...state,
        isFetching: true
      };
    case _action.authAction.STOP_REQUEST_TOKEN:
      return {
        ...state,
        request: {
          ...state.requestState,
          token: action.token,
        }
      };
    default:
      return state;
  }
};
export { authReducer };
