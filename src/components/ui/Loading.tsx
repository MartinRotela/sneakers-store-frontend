import { Col, Container, Row, Spinner, Stack } from 'react-bootstrap';

const Loading = () => {
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
                        <h2 className="mr-2">Loading</h2>
                        <Spinner
                            animation="border"
                            variant="dark"
                            className="ml-2"
                        />
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
};

export default Loading;
