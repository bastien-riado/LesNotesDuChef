import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { s } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { FONTSIZE } from '../../globals/styles/typography';

const Container = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 12px;
`;

const ProfileTouchable = styled.TouchableOpacity``;

const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-right: ${s(10)}px;
  margin-left: ${s(10)}px;
`;

const EmailText = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  flex-shrink: 1;
  flex-wrap: wrap;
  max-width: 80%;
`;

const CustomBottomSheetModal = styled(BottomSheetModal).attrs((props) => ({
  backgroundStyle: {
    backgroundColor: props.theme.backgroundPrimary,
  },
  handleIndicatorStyle: {
    backgroundColor: props.theme.text,
  },
}))``;

const MenuScrollView = styled(BottomSheetScrollView).attrs((props) => ({
  contentContainerStyle: {
    alignItems: 'center',
    backgroundColor: props.theme.backgroundPrimary,
    padding: 20,
  },
}))``;

const MenuItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding: 20px;
  width: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundSecondary};
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

export {
  Container,
  CustomBottomSheetModal,
  CustomBottomSheetView,
  EmailText,
  MenuItem,
  MenuItemText,
  MenuScrollView,
  ProfileImage,
  ProfileTouchable,
  SubMenuContainer,
};
