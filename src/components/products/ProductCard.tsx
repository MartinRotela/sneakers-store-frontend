import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import { Product } from '../../interface/interfaces';

const ProductCard = ({ name, price, image_url, id }: Product) => {
    return (
        <div>
            <Col className=" d-flex justify-content-center">
                <Card
                    as={Link}
                    to={'/product/' + id}
                    bg="dark"
                    text="light"
                    style={{ width: '18rem', textDecoration: 'none' }}
                    className="mb-2 "
                >
                    <Card.Img
                        variant="top"
                        src={image_url}
                        className="overflow-hidden"
                    />
                    <Card.Body>
                        <Card.Title className="text-center">{name}</Card.Title>
                        <Card.Subtitle className="text-center">
                            ${price}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default ProductCard;
