import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userReducer from "./user/userSlice.js"
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist"
import persistStore from "redux-persist/es/persistStore";



const rootReducer =combineReducers({
   user:userReducer, 

});


 const persistConfig={
    key:'root',
    storage,
    version:1,
 }

 // need of persister is used when we refreshing our page then data of user should not be lost 
const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store =configureStore({
   reducer:persistedReducer,
       middleware:(getDefaultMiddleware)=>(
           getDefaultMiddleware({serializableCheck:false})
)
   },
)

export const persistor=persistStore(store);
