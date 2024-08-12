import { Animated } from 'react-native';
import { vs } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { TYPO } from '../../globals/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundPrimary};
  margin-bottom: ${vs(10)}px;
`;

export const AnimatedIngredientsList = styled(Animated.View)`
  margin-top: ${vs(10)}px;
  border-radius: 12px;
  border-width: 3px;
`;

export const PressableIngredient = styled.Pressable<{
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
}>`
  padding: 15px;
  background-color: ${(props) =>
    props.isSelected ? props.theme.backgroundSuccess : props.theme.backgroundSecondary};
  border-top-left-radius: ${(props) => (props.isFirst ? '10px' : '0px')};
  border-top-right-radius: ${(props) => (props.isFirst ? '10px' : '0px')};
  border-bottom-left-radius: ${(props) => (props.isLast ? '10px' : '0px')};
  border-bottom-right-radius: ${(props) => (props.isLast ? '10px' : '0px')};
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

export const IngredientText = styled.Text`
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
`;

export const Icon = styled(MaterialCommunityIcons).attrs((props) => ({
  color: props.theme.success,
}))`
  position: absolute;
  right: 10px;
  top: 50%;
`;

export const AnimatedIcon = styled(MaterialCommunityIcons).attrs((props) => ({
  color: props.theme.icon,
}))``;

export const ReadyView = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: ${vs(10)}px;
`;

export const ReadyText = styled.Text`
  font-size: ${TYPO.FONTSIZE.LARGE}px;
  color: ${(props) => props.theme.text};
  text-align: center;
`;

export const Tytle = styled.Text`
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;

export const BlankStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const BlankStateText = styled.Text`
  font-size: ${TYPO.FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  text-align: center;
  margin-top: 10px;
`;

export const BlankStateIcon = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.icon};
`;
