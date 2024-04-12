import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {persistReducer,persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import loginReducer from "./reducers/loginReducer";
import loginTokenReducer from "./reducers/loginTokenReducer";

const reducer=combineReducers({
    user:loginReducer,
    token:loginTokenReducer,
})
const persistConfig={
    key:"root",
    storage,
    version:1,
    whitelist:["user","token"],
    blacklist:["",""]
}

const persistedReducer=persistReducer(persistConfig,reducer)
export const store=createStore(persistedReducer,applyMiddleware(logger))
export const persistor=persistStore(store)


export default  reducer
//export default rootReducer