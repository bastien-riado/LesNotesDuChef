import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import { TYPO } from '../../../globals/styles';

const TouchableOpacityContainer = styled(TouchableOpacity)`
  margin: 20px;
  margin-bottom: 5px;
  border-radius: 10px;
  elevation: 5;
  height: 200px;
`;

const ImageBackgroundContainer = styled(ImageBackground)`
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
`;

const RecipeInfoContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoText = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

const NameText = styled(Text)`
  font-size: 16px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
  padding-left: 6px;
  padding-right: 6px;
`;

const Icon = styled(MaterialCommunityIcons).attrs((props) => ({
  size: TYPO.ICONSIZE.SMALL,
  color: props.theme.icon,
}))``;

const StyledCheckbox = styled(Checkbox).attrs((props) => ({
  color: props.theme.textColor,
}))``;

const RecipeInfoTextContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundPrimary};
  margin-top: 8px;
  margin-bottom: 8px;
  align-self: flex-start;
  border-radius: 20px;
  padding: 2px;
  padding-left: 6px;
  padding-right: 6px;
  elevation: 5;
  margin-left: 10px;
`;

export {
  Icon,
  ImageBackgroundContainer,
  InfoText,
  NameText,
  RecipeInfoContainer,
  RecipeInfoTextContainer,
  StyledCheckbox,
  TouchableOpacityContainer,
};
