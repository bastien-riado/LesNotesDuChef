import React = require('react');

import styled from 'styled-components/native';
import NewRecipeGeneratedComponent from '../components/NewRecipeGeneratedComponent/NewRecipeGeneratedComponent';
import { NewRecipeGeneratedScreenProps } from '../navigation/NavigationTypes';

const NewRecipeGeneratedScreen: React.FC<NewRecipeGeneratedScreenProps> = () => {
  return (
    <Container>
      <NewRecipeGeneratedComponent />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

export default NewRecipeGeneratedScreen;
