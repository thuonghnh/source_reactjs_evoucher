import { combineReducers } from "redux";
import { authReducer } from '../containers/login/reducer';
import { epackageReducer } from "../containers/evoucherpackage/reducer";
import { redeemerReducer } from "../containers/declareRedemer/reducer";
import { declarePackageReducer } from "../containers/declarePackage/reducer";
import { packageProfileReducer } from '../containers/evoucherProfile/reducer';
import { cacheReducer } from '../common/cache/reducer';
const rootReducer = combineReducers({
    auth: authReducer,
    epackage: epackageReducer,
    redeemer: redeemerReducer,
    declarePackage: declarePackageReducer,
    packageProfile: packageProfileReducer,
    cache: cacheReducer
})
export default rootReducer