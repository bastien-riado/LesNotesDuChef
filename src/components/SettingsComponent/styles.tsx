import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Divider } from '@react-native-material/core';
import { Button } from 'react-native-paper';
import { s } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { TYPO } from '../../globals/styles';
import { FONTSIZE } from '../../globals/styles/typography';

const CustomBottomSheetModal = styled(BottomSheetModal).attrs((props) => ({
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

const PatchNoteTitleView = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.divider};
  flex-direction: column;
`;

const PatchNoteText = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  font-weight: normal;
  margin-left: 10px;
`;

const CustomBottomSheetView = styled(BottomSheetView)`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

const PatchNoteScrollView = styled(BottomSheetScrollView).attrs((props) => ({
  contentContainerStyle: {
    alignItems: 'flex-start',
    backgroundColor: props.theme.backgroundPrimary,
    padding: 20,
  },
}))``;

const LanguageScrollView = styled(BottomSheetScrollView).attrs((props) => ({
  contentContainerStyle: {
    alignItems: 'center',
    backgroundColor: props.theme.backgroundPrimary,
    padding: 20,
  },
}))``;

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
  margin: 8px;
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

const DisplayName = styled.Text`
  font-size: ${TYPO.FONTSIZE.LARGE}px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
  margin-bottom: 10px;
`;

const AppInfos = styled.Text`
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;

const GroupOptionsContainer = styled.View``;

const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
`;

const OptionContainerSpaced = styled.TouchableOpacity`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const InfoContainer = styled.View``;

const OptionText = styled.Text`
  color: ${(props) => props.theme.text};
  margin-left: 34px;
  font-weight: bold;
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
`;

const GroupTitle = styled.Text`
  font-size: ${TYPO.FONTSIZE.SMALL}px;
  color: ${(props) => props.theme.text};
  font-weight: normal;
  margin-bottom: 8px;
  padding-left: 10px;
`;

export {
  AppInfos,
  Container,
  CustomBottomSheetModal,
  CustomBottomSheetView,
  CustomDivider,
  DisconectButton,
  DisplayName,
  GroupOptionsContainer,
  GroupTitle,
  Icon,
  InfoContainer,
  LanguageScrollView,
  MenuItem,
  MenuItemText,
  OptionContainer,
  OptionContainerSpaced,
  OptionText,
  PatchNoteScrollView,
  PatchNoteText,
  PatchNoteTitleView,
  SubMenuContainer,
};
