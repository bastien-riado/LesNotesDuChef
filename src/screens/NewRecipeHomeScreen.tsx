import React from 'react';
import styled from 'styled-components/native';
import NewRecipeHomeComponent from '../components/NewRecipeHomeComponent';
import { NewRecipeHomeScreenProps } from '../navigation/NavigationTypes';

const NewRecipeHomeScreen: React.FC<NewRecipeHomeScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <NewRecipeHomeComponent navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

export default NewRecipeHomeScreen;
