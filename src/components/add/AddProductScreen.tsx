import React, { useMemo, useState } from 'react';
import FormData from 'form-data';
import { Form, FormGroup, Container, Button, Alert } from 'react-bootstrap';

import { useForm } from '../../hooks/useForm';
import { AddProduct, Brand } from '../../interface/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startAddProduct } from '../../store/slices/product/thunks';

const initialState = {
    name: '',
    price: 0,
    image: null,
    description: '',
    BrandId: 0,
};

const AddProductScreen = () => {
    const [image, setImage] = useState<File | null>(null);
    const { values, handleInputChange } = useForm<AddProduct>(initialState);

    const dispatch = useAppDispatch();

    const { brands } = useAppSelector((state) => state.brands);
    const { isLoading, errorMessage } = useAppSelector(
        (state) => state.products
    );

    const isChecking = useMemo(() => isLoading, [isLoading]);
    const handleInputFileChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        if (target.files) {
            console.log(target.files[0]);
            setImage(target.files[0]);
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProduct = new FormData();
        newProduct.append('image', image);
        newProduct.append('name', values.name);
        newProduct.append('description', values.description);
        newProduct.append('price', values.price);
        newProduct.append('BrandId', values.BrandId);

        dispatch(startAddProduct(newProduct));
    };

    return (
        <Container>
            <h2>Add Product</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Form.Label>Add Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="name"
                        name="name"
                        onChange={handleInputChange}
                        value={values.name}
                    />
                    <Form.Label>Add Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={handleInputChange}
                        value={values.price}
                    />
                    <Form.Label>Add Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                    />
                    <Form.Label>Add image</Form.Label>
                    <Form.Control
                        type="file"
                        placeholder="Select an image"
                        name="image"
                        onChange={handleInputFileChange}
                    />
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
                </FormGroup>
                {errorMessage && (
                    <Alert className="mt-2" variant="danger">
                        {errorMessage}
                    </Alert>
                )}
                <Button
                    type="submit"
                    variant="dark"
                    disabled={isChecking}
                    className="mt-2"
                >
                    Add
                </Button>
            </Form>
        </Container>
    );
};

export default AddProductScreen;
