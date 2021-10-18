import { configureStore, combineReducers } from '@reduxjs/toolkit';
import undoable from 'redux-undo';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import todoReducer from 'features/Todo/todoSlice';
import settingsReducer from 'redux/settingsSlice';

const rootReducer = combineReducers({
  todos: undoable(todoReducer, {
    limit: 1,
  }),
  settings: settingsReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage('TodoDB'),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
