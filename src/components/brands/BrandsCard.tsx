import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import { Brand } from '../../interface/interfaces';

const BrandsCard = ({ name, id, logo_url }: Brand) => {
    return (
        <div>
            <Col className="justify-content-around">
                <Card
                    as={Link}
                    to={'/brand/' + id}
                    bg="dark"
                    text="light"
                    style={{
                        width: '18rem',
                        height: '10rem',
                        overflow: 'hidden',
                    }}
                    className="mb-2 justify-content-center align-items-center"
                >
                    <Card.Img variant="top" src={logo_url} />
                </Card>
            </Col>
        </div>
    );
};

export default BrandsCard;
