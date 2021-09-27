import * as _action from './action';
import * as _state from './state';

const redeemerReducer = (state = _state.redeemerState, action) => {
  switch (action.type) {
    case _action.redeemerAction.START_GET_LIST_REDEEMER:
      return {
        ...state,
        lstRedeemer: {
          ...state.lstRedeemer,
          isFetching: true,
        },
      };
    case _action.redeemerAction.STOP_GET_LIST_REDEEMER:
      return {
        ...state,
        lstRedeemer: {
          ...state.lstRedeemer,
          isFetching: false,
          isSuccess: action.isSuccess,
          isError: !action.isSuccess,
          errorDiscription: action.errorDiscription,
          dataRedeemer: action.dataRedeemer,
        },
      };
    default:
      return state;
  }
};
export { redeemerReducer };
