import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import userSlice from "./Current user data/userSlice";

// Define persist configuration
const persistConfig = {
  key: "root", 
  storage, 
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
