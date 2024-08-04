import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Divider } from '@react-native-material/core';
import { Button } from 'react-native-paper';
import { s } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { TYPO } from '../../globals/styles';
import { FONTSIZE } from '../../globals/styles/typography';

const CustomBottomSheetModal = styled(BottomSheetModal).attrs((props) => ({
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backgroundStyle: {
    backgroundColor: props.theme.backgroundPrimary,
  },
  handleIndicatorStyle: {
    backgroundColor: props.theme.text,
  },
}))``;

const MenuItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<{ selected: boolean }>`
  padding: 20px;
  width: 100%;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? props.theme.activeLink : props.theme.backgroundSecondary};
`;

const MenuItemText = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;

const CustomBottomSheetView = styled(BottomSheetView)`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

const SubMenuContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;
const Container = styled.View`
  padding: 12px;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

const CustomDivider = styled(Divider).attrs((props) => ({
  color: props.theme.divider,
}))`
  margin: 10px;
`;

const DisconectButton = styled(Button).attrs((props) => ({
  buttonColor: props.theme.backgroundDanger,
  textColor: props.theme.textDanger,
  contentStyle: { paddingHorizontal: s(16) },
}))`
  margin: auto;
`;

const Icon = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.icon};
`;

const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const OptionText = styled.Text`
  color: ${(props) => props.theme.text};
  margin-left: 34px;
  font-weight: bold;
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
`;

export {
  Container,
  CustomBottomSheetModal,
  CustomBottomSheetView,
  CustomDivider,
  DisconectButton,
  Icon,
  MenuItem,
  MenuItemText,
  OptionContainer,
  OptionText,
  SubMenuContainer,
};
