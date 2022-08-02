import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    ButtonGroup,
    Modal,
    Form,
    Alert,
} from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import { AddProduct, Brand, Product } from '../../interface/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    startDeletingProduct,
    getProductById,
    startUpdateProducts,
} from '../../store/slices/product/thunks';
import Loading from '../ui/Loading';

const initialState = {
    name: '',
    price: 0,
    image: null,
    description: '',
    BrandId: 0,
};

const ProductScreen = () => {
    const { product } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { role } = useAppSelector((state) => state.auth);
    const { selectedProduct, isLoading, errorMessage, notFound } =
        useAppSelector((state) => state.products);

    const [image, setImage] = useState<File | null>(null);
    const [show, setShow] = useState<boolean>(false);

    const { brands } = useAppSelector((state) => state.brands);
    const { image_url, name, description, price, id, BrandId } =
        selectedProduct as Product;

    const isChecking = useMemo(() => isLoading, [isLoading]);

    const { values, handleInputChange, reset } =
        useForm<AddProduct>(initialState);

    useEffect(() => {
        if (product) {
            dispatch(getProductById(product));
        }
    }, [dispatch, product]);

    const handleDelete = () => {
        dispatch(startDeletingProduct(id));
        navigate('/');
    };

    const handleOpenModal = () => {
        reset({
            name,
            description,
            price,
            BrandId,
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
            setImage(target.files[0]);
        }
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedProduct = new FormData();
        if (image) {
            updatedProduct.append('image', image);
        }
        if (values.description) {
            updatedProduct.append('description', values.description.toString());
        }
        updatedProduct.append('name', values.name);
        updatedProduct.append('price', values.price.toString());
        updatedProduct.append('BrandId', values.BrandId.toString());
        dispatch(startUpdateProducts(updatedProduct, id));
        navigate('/');
    };

    return (
        <>
            {isChecking ? (
                <Loading />
            ) : notFound ? (
                <Navigate to="/" />
            ) : (
                <Container fluid>
                    <Row md={1} lg={2}>
                        <Col className="d-flex justify-content-center">
                            <Image src={image_url} />
                        </Col>
                        <Col>
                            <h2>{name}</h2>
                            <p>{description}</p>
                            <p>{price}</p>
                            <ButtonGroup>
                                {errorMessage && (
                                    <Alert className="mt-2" variant="danger">
                                        {errorMessage}
                                    </Alert>
                                )}
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
                                    <Button
                                        variant="danger"
                                        className="ml-2"
                                        onClick={handleDelete}
                                        disabled={isChecking}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </ButtonGroup>
                        </Col>
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
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Enter a description"
                                        name="description"
                                        value={values.description}
                                        onChange={handleInputChange}
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
                                <Form.Group>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Select
                                        id="brand"
                                        name="BrandId"
                                        value={values.BrandId}
                                        onChange={handleInputChange}
                                        placeholder="Select a brand..."
                                        defaultValue={0}
                                    >
                                        <option value={0} disabled>
                                            Select a brand...
                                        </option>

                                        {brands.map((brand: Brand, i) => (
                                            <option value={brand.id} key={i}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </Form.Select>
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

export default ProductScreen;
