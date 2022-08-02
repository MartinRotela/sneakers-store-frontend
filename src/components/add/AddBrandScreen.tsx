import React, { useState, useMemo } from 'react';
import FormData from 'form-data';
import { Form, FormGroup, Container, Button, Alert } from 'react-bootstrap';

import { useForm } from '../../hooks/useForm';
import { AddBrand } from '../../interface/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startAddBrand } from '../../store/slices/brand/thunks';

const AddBrandScreen = () => {
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<File | null>(null);
    const { values, handleInputChange } = useForm<AddBrand>({
        name: '',
        image: null,
    });

    const { isLoading, errorMessage } = useAppSelector((state) => state.brands);

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
        const newBrand = new FormData();
        newBrand.append('image', image);
        newBrand.append('name', values.name);
        dispatch(startAddBrand(newBrand));
    };

    return (
        <Container>
            <h2>Add Brand</h2>
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
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        placeholder="Select an image"
                        name="image"
                        onChange={handleInputFileChange}
                    />
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

export default AddBrandScreen;
