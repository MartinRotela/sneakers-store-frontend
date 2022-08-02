import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Brand } from '../../interface/interfaces';

export const brandSlice = createSlice({
    name: 'brand',
    initialState: {
        brands: [] as Brand[],
        isLoading: false,
        selectedBrand: {} as Brand | {},
        errorMessage: '',
        notFound: false,
    },
    reducers: {
        startLoadingBrands: (state) => {
            state.isLoading = true;
            state.notFound = false;
        },
        setBrands: (state, action) => {
            state.isLoading = false;
            state.notFound = false;
            state.brands = action.payload;
            state.errorMessage = '';
        },
        setSelectedBrand: (state, action) => {
            state.isLoading = false;
            state.notFound = false;
            state.selectedBrand = action.payload;
            state.errorMessage = '';
        },
        deleteBrand: (state, action) => {
            state.selectedBrand = {};
            state.notFound = false;
            state.brands = state.brands.filter(
                (brand: Brand) => brand.id !== action.payload
            );
            state.isLoading = false;
            state.errorMessage = '';
        },
        addBrand: (state, action: PayloadAction<Brand>) => {
            state.brands = [...state.brands, action.payload];
            state.isLoading = false;
            state.errorMessage = '';
        },
        updateBrand: (state, action: PayloadAction<Brand>) => {
            state.brands = state.brands.filter(
                (brand: Brand) => brand.id !== action.payload.id
            );
            state.brands = [...state.brands, action.payload];
            state.isLoading = false;
            state.errorMessage = '';
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
    startLoadingBrands,
    setBrands,
    setSelectedBrand,
    deleteBrand,
    addBrand,
    updateBrand,
    setErrorMessage,
    setNotFound,
} = brandSlice.actions;
