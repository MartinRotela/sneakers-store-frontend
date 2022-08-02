import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
    Button,
    Container,
    Image,
    Row,
    ButtonGroup,
    Form,
    Modal,
} from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { AddBrand, Brand, Product } from '../../interface/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getBrandById,
    startDeletingBrand,
    startUpdateBrands,
} from '../../store/slices/brand/thunks';
import ProductCard from '../products/ProductCard';
import Loading from '../ui/Loading';
import NoItems from '../ui/NoItems';

const initialState = {
    name: '',
    image: null,
};

const BrandScreen = () => {
    const [show, setShow] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const { values, handleInputChange, reset } =
        useForm<AddBrand>(initialState);

    const { brand } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { role } = useAppSelector((state) => state.auth);
    const { selectedBrand, isLoading } = useAppSelector(
        (state) => state.brands
    );
    const { products, logo_url, name, id } = selectedBrand as Brand;
    const { notFound } = useAppSelector((state) => state.brands);

    const isChecking = useMemo(() => isLoading, [isLoading]);

    useEffect(() => {
        if (brand) {
            dispatch(getBrandById(brand));
        }
    }, [dispatch, brand]);

    const handleDelete = () => {
        if (brand) {
            dispatch(startDeletingBrand(brand));
            navigate('/brands');
        }
    };

    const handleOpenModal = () => {
        reset({
            name,
            image,
        });
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleInputFileChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        if (target.files) {
            console.log(target.files[0]);
            setImage(target.files[0]);
        }
    };
    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedBrand = new FormData();
        if (image) {
            updatedBrand.append('image', image);
        }
        updatedBrand.append('name', values.name);
        dispatch(startUpdateBrands(updatedBrand, id));
        navigate('/brands');
    };
    return (
        <>
            {isChecking ? (
                <Loading />
            ) : notFound ? (
                <Navigate to="/brands" />
            ) : (
                <Container>
                    <Row className="justify-content-center">
                        <Image
                            rounded
                            style={{ width: '18rem' }}
                            src={logo_url}
                        />
                        <h2 className="text-center mt-2">{name}</h2>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <ButtonGroup style={{ width: '22rem' }}>
                            {role && (
                                <Button
                                    variant="dark"
                                    onClick={handleOpenModal}
                                    disabled={isChecking}
                                >
                                    Modify
                                </Button>
                            )}
                            {role === 'ADMIN_ROLE' && (
                                <>
                                    <Button
                                        variant="danger"
                                        className="ml-2"
                                        onClick={handleDelete}
                                        disabled={isChecking}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </ButtonGroup>
                    </Row>
                    <Row xs={1} md={2} lg={3} className="mt-5">
                        {products ? (
                            products.map((product: Product, i) => (
                                <ProductCard key={i} {...product} />
                            ))
                        ) : (
                            <NoItems />
                        )}
                    </Row>
                    {/* Modal */}

                    <Modal
                        show={show}
                        onHide={handleClose}
                        onSubmit={handleSave}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Modify</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="name"
                                        placeholder="Enter a name..."
                                        name="name"
                                        value={values.name}
                                        onChange={handleInputChange}
                                        autoFocus
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Label>Add image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        placeholder="Select an image"
                                        name="image"
                                        onChange={handleInputFileChange}
                                    />
                                </Form.Group>

                                <Button variant="light" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="dark" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Container>
            )}
        </>
    );
};

export default BrandScreen;
