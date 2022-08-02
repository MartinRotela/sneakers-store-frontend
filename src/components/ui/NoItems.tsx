import React from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';

const NoProducts = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col
                    md="auto"
                    className="position-fixed h-75  d-flex align-items-center"
                >
                    <Stack
                        direction="horizontal"
                        gap={3}
                        className="d-flex justify-content-center"
                    >
                        <h2 className="mr-2">There is nothing to show</h2>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default NoProducts;
