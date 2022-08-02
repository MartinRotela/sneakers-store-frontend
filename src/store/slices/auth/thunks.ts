import axios from 'axios';
import { sneakersApi } from '../../../api/sneakersApi';
import { MyError } from '../../../interface/interfaces';
import { AppThunk } from '../../store';
import { setErrorMessage, setUser, startLoadingUser } from '../authSlice';

export const login = (email: string, password: string): AppThunk => {
    return async (dispatch, getState) => {
        try {
            dispatch(startLoadingUser());
            const { data } = await sneakersApi.post('/auth', {
                email,
                password,
            });
            localStorage.setItem('token', data.token);
            dispatch(setUser(data));
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

export const renewUser = (): AppThunk => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        localStorage.clear();
        try {
            if (token) {
                const { data } = await sneakersApi.get('/auth/renew', {
                    headers: {
                        'x-token': token,
                    },
                });
                const { token: newToken, ...userData } = data;

                localStorage.setItem('token', newToken);

                dispatch(setUser(userData));
            }
        } catch (error) {
            console.log(error);
        }
    };
};
