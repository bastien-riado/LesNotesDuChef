import Spinner from 'react-native-loading-spinner-overlay';
import { Button } from 'react-native-paper';
import { s, vs } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { TYPO } from '../../globals/styles';

const aspectRatio = 0.75;

const HomeContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
`;

const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const ScrollOutputContainer = styled.ScrollView`
  flex-grow: 1;
  padding-left: 12px;
  padding-right: 12px;
`;

const ScrollContainerRes = styled.ScrollView`
  flex-grow: 1;
  padding-left: 12px;
  padding-right: 12px;
`;

const StyledImage = styled.Image`
  align-self: center;
  width: 80%;
  height: auto;
  aspect-ratio: ${aspectRatio};
`;

const StyledImageContainer = styled.View`
  position: relative;
`;

const StyledPaperButton = styled(Button).attrs((props) => ({
  buttonColor: props.theme.button,
  textColor: props.theme.text,
  contentStyle: { paddingHorizontal: s(16) },
}))`
  margin-left: auto;
  margin-right: auto;
  margin-vertical: ${vs(10)}px;
`;

const Loader = styled(Spinner).attrs((props) => ({
  textStyle: { color: props.theme.text },
  color: props.theme.text,
}))``;

const CancelButton = styled.TouchableOpacity`
  position: absolute;
  top: ${vs(-10)}px;
  right: ${s(24)}px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.closeButton};
`;

const CancelIcon = styled(MaterialCommunityIcons)`
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.closeIcon};
`;

const InformationText = styled.Text`
  color: ${(props) => props.theme.text};
  text-align: center;
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
`;

const WarningText = styled.Text`
  color: ${(props) => props.theme.warning};
  text-align: center;
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
`;

export {
  CancelButton,
  CancelIcon,
  HomeContainer,
  ImageContainer,
  InformationText,
  Loader,
  ScrollContainerRes,
  ScrollOutputContainer,
  StyledImage,
  StyledImageContainer,
  StyledPaperButton,
  WarningText,
};
