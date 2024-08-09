import Spinner from 'react-native-loading-spinner-overlay';
import styled from 'styled-components/native';
import { FONTSIZE } from '../../../../globals/styles/typography';

const CustomSpinner = styled(Spinner).attrs((props) => ({
  textStyle: { color: props.theme.text },
}))``;

const ModalContent = styled.View`
  background-color: ${(props) => props.theme.backgroundPrimary};
  padding: 20px;
  border-radius: 10px;
`;

const ModalTitle = styled.Text`
  font-size: ${FONTSIZE.LARGE}px;
  margin-bottom: 20px;
  text-align: center;
  color: ${(props) => props.theme.text};
`;

const ModalButton = styled.TouchableOpacity`
  padding: 15px;
`;

const ModalButtonText = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  text-align: center;
`;

export { CustomSpinner, ModalContent, ModalTitle, ModalButton, ModalButtonText };
