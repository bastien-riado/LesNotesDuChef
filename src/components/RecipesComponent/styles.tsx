import { Animated, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Ellipse } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const SearchBarContainer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 1;
`;

const EllipseContainer = styled(Animated.View)`
  width: 100%;
  height: 100px;
  bottom: -30px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const CustomSearchbar = styled(Searchbar).attrs((props) => ({
  iconColor: props.theme.icon,
  inputStyle: {
    color: props.theme.text,
  },
  elevation: 5,
}))`
  background-color: ${(props) => props.theme.backgroundPrimary};
  margin: 10px;
`;

const CustomEllipse = styled(Ellipse).attrs((props) => ({
  fill: props.theme.backgroundDanger,
}))``;

const EllipseButton = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonContent = styled.View`
  align-items: center;
  position: absolute;
  bottom: 40px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;

const Icon = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.icon};
  margin-right: 10px;
`;

export {
  ButtonContent,
  ButtonText,
  Container,
  CustomEllipse,
  CustomSearchbar,
  EllipseButton,
  EllipseContainer,
  Icon,
  SearchBarContainer,
};
