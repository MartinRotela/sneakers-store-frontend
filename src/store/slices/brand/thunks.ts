import { sneakersApi } from '../../../api/sneakersApi';
import { AppThunk } from '../../store';
import axios from 'axios';
import {
    addBrand,
    deleteBrand,
    setBrands,
    setErrorMessage,
    setNotFound,
    setSelectedBrand,
    startLoadingBrands,
    updateBrand,
} from '../brandSlice';
import { MyError } from '../../../interface/interfaces';
export const getBrands = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingBrands());
            const { data } = await sneakersApi.get('/brands');
            dispatch(setBrands(data.brands));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error) {
                    const err = error?.response?.data as MyError;
                    const { msg } = err;
                    dispatch(setErrorMessage(msg));
                }
            } else {
                throw new Error('An unexpected error ocurred');
            }
        }
    };
};

export const getBrandById = (brand: string): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingBrands());
            const { data } = await sneakersApi.get('/brands/' + brand);
            dispatch(setSelectedBrand(data.brand));
        } catch (error) {
            dispatch(setNotFound());
            if (axios.isAxiosError(error)) {
                if (error) {
                    const err = error?.response?.data as MyError;
                    const { msg } = err;
                    dispatch(setErrorMessage(msg));
                }
            } else {
                throw new Error('An unexpected error ocurred');
            }
        }
    };
};

export const startDeletingBrand = (brand: string): AppThunk => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await sneakersApi.delete('brands/' + brand, {
                    headers: { 'x-token': token },
                });
                dispatch(deleteBrand(brand));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error) {
                    const err = error?.response?.data as MyError;
                    const { msg } = err;
                    dispatch(setErrorMessage(msg));
                }
            } else {
                throw new Error('An unexpected error ocurred');
            }
        }
    };
};

export const startAddBrand = (
    brand: any,
    reset: Function,
    setImage: Function
): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem('token');
            console.log(brand);
            dispatch(startLoadingBrands());
            if (token) {
                const { data } = await sneakersApi.post('brands/new', brand, {
                    headers: {
                        'x-token': token,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                dispatch(addBrand(data.brand));
                reset();
                setImage(null);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error) {
                    const err = error?.response?.data as MyError;
                    const { msg } = err;
                    dispatch(setErrorMessage(msg));
                }
            } else {
                throw new Error('An unexpected error ocurred');
            }
        }
    };
};

export const startUpdateBrands = (brand: any, id: number): AppThunk => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            dispatch(startLoadingBrands());
            if (token) {
                const { data } = await sneakersApi.put('brands/' + id, brand, {
                    headers: {
                        'x-token': token,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                dispatch(updateBrand(data.brand));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error) {
                    const err = error?.response?.data as MyError;
                    const { msg } = err;
                    dispatch(setErrorMessage(msg));
                }
            } else {
                throw new Error('An unexpected error ocurred');
            }
        }
    };
};
