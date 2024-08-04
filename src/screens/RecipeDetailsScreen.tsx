import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components';
import RecipeDetailsComponent from '../components/RecipeDetailsComponent/RecipeDetailsComponent';

const RecipeDetailsScreen: React.FC = () => {
  return (
    <ViewContainer>
      <RecipeDetailsComponent />
    </ViewContainer>
  );
};

const ViewContainer = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

export default RecipeDetailsScreen;
