import React from 'react';
import styled from 'styled-components/native';
import SettingsComponent from '../components/SettingsComponent';

import { SettingsScreenProps } from '../navigation/NavigationTypes';

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <Container>
      <SettingsComponent />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

export default SettingsScreen;
