import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h3 className="text-center text-white mb-4">
              Revolution of the reviews
            </h3>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
