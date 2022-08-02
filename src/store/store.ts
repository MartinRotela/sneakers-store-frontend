import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { productSlice } from './slices/productSlice';
import { brandSlice } from './slices/brandSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        products: productSlice.reducer,
        brands: brandSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
