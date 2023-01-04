import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './MainScreen.css';

const MainScreen = ({ title, children }) => (
  <Container className="blog-post">
    <Row>
      <Col xs={12}>
        <h1>{title}</h1>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        {children}
      </Col>
    </Row>
  </Container>
);

export default MainScreen;
