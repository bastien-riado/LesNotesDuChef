import { Text, View } from 'react-native';
import styled from 'styled-components';
import { TYPO } from '../../globals/styles';

const Container = styled(View)`
  margin-top: 12px;
`;

const InfoContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const DescriptionContainer = styled(View)`
  margin-top: 8px;
`;

const Label = styled(Text)`
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const Value = styled(Text)`
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
`;

export { Container, DescriptionContainer, InfoContainer, Label, Value };
