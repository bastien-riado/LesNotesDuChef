import React = require('react');

import styled from 'styled-components/native';
import NewRecipeByHandComponent from '../components/NewRecipeByHandComponent/NewRecipeByHandComponent';
import { NewRecipeByHandScreenProps } from '../navigation/NavigationTypes';

const NewRecipeByHandScreen: React.FC<NewRecipeByHandScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <NewRecipeByHandComponent navigation={navigation} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

export default NewRecipeByHandScreen;
