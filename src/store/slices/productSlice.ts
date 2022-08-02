import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../interface/interfaces';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [] as Product[],
        isLoading: false,
        selectedProduct: '' as Product | '',
        errorMessage: '',
        notFound: false,
    },
    reducers: {
        startLoadingProducts: (state) => {
            state.isLoading = true;
            state.errorMessage = '';
            state.notFound = false;
        },
        setProducts: (state, action) => {
            state.errorMessage = '';
            state.isLoading = false;
            state.products = action.payload;
            state.notFound = false;
        },

        setSelectedProduct: (state, action) => {
            state.errorMessage = '';
            state.isLoading = false;
            state.selectedProduct = action.payload;
            state.notFound = false;
        },
        clearSelectedProduct: (state) => {
            state.errorMessage = '';
            state.selectedProduct = '';
            state.notFound = false;
        },
        deleteProduct: (state, action) => {
            state.errorMessage = '';
            state.selectedProduct = '';
            state.products = state.products.filter(
                (product: Product) => product.id !== action.payload
            );
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.errorMessage = '';
            state.products = [...state.products, action.payload];
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            state.errorMessage = '';
            state.products = state.products.filter(
                (product: Product) => product.id !== action.payload.id
            );
            state.products = [...state.products, action.payload];
        },
        setErrorMessage: (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
        setNotFound: (state) => {
            state.notFound = true;
            state.isLoading = false;
        },
    },
});

export const {
    startLoadingProducts,
    updateProduct,
    setProducts,
    setSelectedProduct,
    deleteProduct,
    addProduct,
    clearSelectedProduct,
    setErrorMessage,
    setNotFound,
} = productSlice.actions;
