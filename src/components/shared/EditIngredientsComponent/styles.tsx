import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-paper';
import { s, vs } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { TYPO } from '../../../globals/styles';
import { FONTSIZE } from '../../../globals/styles/typography';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundPrimary};
  margin-bottom: ${vs(10)}px;
`;

export const Input = styled(TextInput).attrs((props) => ({
  textColor: props.theme.text,
}))`
  width: 100%;
  margin-bottom: ${vs(10)}px;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;

export const AddButton = styled.Pressable`
  padding-bottom: 8px;
  padding-top: 7px;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${(props) => props.theme.button};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-color: ${(props) => props.theme.divider};
  width: ${s(100)}px;
`;

export const IngredientsList = styled.View`
  margin-top: ${vs(10)}px;
`;

export const Icon = styled(MaterialCommunityIcons).attrs((props) => ({
  color: props.theme.icon,
}))``;

export const PressableItem = styled.Pressable<{ isFirst: boolean; isLast: boolean }>`
  padding: 15px;
  background-color: ${(props) => props.theme.backgroundSecondary};
  border-top-left-radius: ${(props) => (props.isFirst ? '10px' : '0px')};
  border-top-right-radius: ${(props) => (props.isFirst ? '10px' : '0px')};
  border-bottom-left-radius: ${(props) => (props.isLast ? '10px' : '0px')};
  border-bottom-right-radius: ${(props) => (props.isLast ? '10px' : '0px')};
  border-width: 1px;
  border-color: ${(props) => props.theme.divider};
  border-bottom-width: ${(props) => (props.isLast ? '1px' : '0px')};
`;

export const ItemText = styled.Text`
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
`;

export const Text = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.text};
  margin-top: 20px;
`;

export const CustomBottomSheetModal = styled(BottomSheetModal).attrs((props) => ({
  backgroundStyle: {
    backgroundColor: props.theme.backgroundPrimary,
  },
  handleIndicatorStyle: {
    backgroundColor: props.theme.text,
  },
}))``;

export const MenuScrollView = styled(BottomSheetScrollView).attrs((props) => ({
  contentContainerStyle: {
    alignItems: 'center',
    backgroundColor: props.theme.backgroundPrimary,
    padding: 20,
  },
}))``;

export const MenuItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding: 20px;
  width: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundSecondary};
`;

export const IngredientName = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
`;

export const SubMenuContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

export const MenuItemText = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;
