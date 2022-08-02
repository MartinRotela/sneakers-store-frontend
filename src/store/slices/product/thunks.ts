import axios from 'axios';
import { sneakersApi } from '../../../api/sneakersApi';
import { MyError } from '../../../interface/interfaces';
import { AppThunk } from '../../store';
import {
    addProduct,
    deleteProduct,
    setErrorMessage,
    setNotFound,
    setProducts,
    setSelectedProduct,
    startLoadingProducts,
    updateProduct,
} from '../productSlice';

export const getProducts = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingProducts());
            const { data } = await sneakersApi.get('/products');
            dispatch(setProducts(data.products));
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

export const getProductById = (product: string): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingProducts());
            const { data } = await sneakersApi.get('/products/' + product);
            dispatch(setSelectedProduct(data.product));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error) {
                    dispatch(setNotFound());
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

export const startDeletingProduct = (product: number): AppThunk => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await sneakersApi.delete('products/' + product, {
                    headers: { 'x-token': token },
                });
                dispatch(deleteProduct(product));
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

export const searchProducts = (search: string): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingProducts());
            const { data } = await sneakersApi.get('/search/' + search);
            dispatch(setProducts(data.products));
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

export const startAddProduct = (product: any): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem('token');
            dispatch(startLoadingProducts());
            if (token) {
                const { data } = await sneakersApi.post(
                    'products/new',
                    product,
                    {
                        headers: {
                            'x-token': token,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                dispatch(addProduct(data.product));
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

export const startUpdateProducts = (product: any, id: number): AppThunk => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            dispatch(startLoadingProducts());
            if (token) {
                const { data } = await sneakersApi.put(
                    'products/' + id,
                    product,
                    {
                        headers: {
                            'x-token': token,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                dispatch(updateProduct(data.product));
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
