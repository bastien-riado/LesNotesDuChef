import React from 'react';
import styled from 'styled-components/native';
import NewRecipeByVisionComponent from '../components/NewRecipeByVisionComponent/NewRecipeByVisionComponent';
import { NewRecipeByVisionScreenProps } from '../navigation/NavigationTypes';

const NewRecipeByVisionScreen: React.FC<NewRecipeByVisionScreenProps> = ({
  navigation,
}) => {
  return (
    <Container>
      <NewRecipeByVisionComponent navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;
export default NewRecipeByVisionScreen;
