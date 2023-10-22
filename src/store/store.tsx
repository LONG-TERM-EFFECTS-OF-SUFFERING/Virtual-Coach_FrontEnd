import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import user from './slices/user/user';
import thunk from 'redux-thunk';


const persistConfig:any = {
    key: 'user',
    storage,
}

const persistedReducer = persistReducer(persistConfig, user)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
