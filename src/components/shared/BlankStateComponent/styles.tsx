import { ImageBackground, Text } from 'react-native';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { FONTSIZE } from '../../../globals/styles/typography';

const StyledImageBackground = styled(ImageBackground)`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledText = styled(Text)`
  text-align: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.text};
  font-size: ${FONTSIZE.LARGE}px;
`;

const CenteredText = styled(Text)`
  text-align: center;
  padding-top: 50%;
  color: ${(props) => props.theme.text};
`;

const StyledPaperButton = styled(Button).attrs((props) => ({
  buttonColor: props.theme.button,
  textColor: props.theme.text,
}))`
  width: auto;
  align-self: center;
`;

export { CenteredText, StyledImageBackground, StyledPaperButton, StyledText };
