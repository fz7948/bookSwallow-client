import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1280px;
  margin: 0 auto;

  @media (max-width: 1280px) {
    width: 960px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

function Responsive({ children, ...rest }) {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
}

export default Responsive;
