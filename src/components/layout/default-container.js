import React from 'react';
import { Container } from 'react-bootstrap'

const DefaultContainer = props => {
  const { children } = props;
  return <Container>{children}</Container>
}

export default DefaultContainer;
