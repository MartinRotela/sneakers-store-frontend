import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProductsScreen from '../components/products/ProductsScreen';
import { NavBar } from '../components/ui/NavBar';
import BrandsScreen from '../components/brands/BrandsScreen';
import ProductScreen from '../components/products/ProductScreen';
import BrandScreen from '../components/brands/BrandScreen';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { renewUser } from '../store/slices/auth/thunks';
import PublicRoute from './PublicRoute';
import { AddBrandProtected } from './AddBrandProtected';
import { AddProductProtected } from './AddProductProtected';

const AppRouter = () => {
    const { uid, role } = useAppSelector((state) => state.auth);
    const isAdmin = role === 'ADMIN_ROLE';
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(renewUser());
    }, [dispatch]);

    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<ProductsScreen />} />
                    <Route
                        path="product/:product"
                        element={<ProductScreen />}
                    />
                    <Route path="/brands" element={<BrandsScreen />} />
                    <Route path="/brand/:brand" element={<BrandScreen />} />
                    <Route
                        path="/search/:search"
                        element={<ProductsScreen />}
                    />

                    <Route
                        path="/add/brand"
                        element={AddBrandProtected(isAdmin)}
                    />
                    <Route
                        path="/add/product"
                        element={AddProductProtected(isAdmin)}
                    />

                    <Route path="/login" element={PublicRoute(!!uid)} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRouter;
