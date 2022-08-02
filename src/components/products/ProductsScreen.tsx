import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProducts, searchProducts } from '../../store/slices/product/thunks';
import { Product } from '../../interface/interfaces';
import Loading from '../ui/Loading';
import { getBrands } from '../../store/slices/brand/thunks';
import NoProducts from '../ui/NoItems';

const ProductsScreen = () => {
    const { isLoading, products } = useAppSelector((state) => state.products);
    const { search } = useParams();
    const dispatch = useAppDispatch();
    const isChecking = useMemo(() => isLoading, [isLoading]);
    useEffect(() => {
        dispatch(getBrands());
        if (search) {
            dispatch(searchProducts(search));
        } else {
            dispatch(getProducts());
        }
    }, [dispatch, search]);

    return (
        <div>
            {isChecking ? (
                <Loading />
            ) : (
                <Container fluid className="mt-4">
                    <Row xs={1} md={2} lg={3} xl={4}>
                        {products ? (
                            products.map((product: Product, i) => (
                                <ProductCard key={i} {...product} />
                            ))
                        ) : (
                            <NoProducts />
                        )}
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default ProductsScreen;
