import React, { useEffect, useMemo } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BrandsCard from './BrandsCard';
import { getBrands } from '../../store/slices/brand/thunks';
import { Brand } from '../../interface/interfaces';
import Loading from '../ui/Loading';
import NoItems from '../ui/NoItems';

const BrandsScreen = () => {
    const dispatch = useAppDispatch();
    const { isLoading, brands } = useAppSelector((state) => state.brands);
    const isChecking = useMemo(() => isLoading, [isLoading]);
    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);
    return (
        <>
            {isChecking ? (
                <Loading />
            ) : (
                <Container className="mt-4">
                    <Row xs={1} md={2} lg={3}>
                        {brands ? (
                            brands.map((brand: Brand, i) => (
                                <BrandsCard key={i} {...brand} />
                            ))
                        ) : (
                            <NoItems />
                        )}
                    </Row>
                </Container>
            )}
        </>
    );
};

export default BrandsScreen;
