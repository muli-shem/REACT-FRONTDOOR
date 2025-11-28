import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import membersReducer from './slices/membersSlice';
// import financeReducer from './slices/financeSlice';
// import projectsReducer from './slices/projectsSlice';
// import orgReducer from './slices/orgSlice';

export const store = configureStore({
  reducer: {
//     auth: authReducer,
//     members: membersReducer,
//     finance: financeReducer,
//     projects: projectsReducer,
//     org: orgReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: ['auth/login/pending', 'auth/login/fulfilled'],
      },
    }),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;