import { s, vs } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { FONTSIZE } from '../../../../globals/styles/typography';

const ModalView = styled.View`
  height: ${vs(200)}px;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundPrimary};
  border-radius: 10px;
`;

const TopHalf = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BottomHalf = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  margin: ${vs(10)}px;
`;

const WarningText = styled.Text`
  color: ${(props) => props.theme.text};
  font-weight: bold;
  padding: ${vs(10)}px;
  text-align: center;
  font-size: ${FONTSIZE.LARGE}px;
`;

const ModalButton = styled.TouchableOpacity<{ color: 'cancel' | 'confirm' }>`
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.color === 'cancel' ? props.theme.button : props.theme.backgroundDanger};
  elevation: ${(props) => (props.color === 'cancel' ? 5 : 0)};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0 ${s(5)}px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.text};
  font-weight: bold;
  font-size: ${FONTSIZE.MEDIUM}px;
  text-align: center;
`;

const ConfirmIcon = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.icon};
  margin-right: ${s(10)}px;
`;

export {
  BottomHalf,
  ButtonText,
  ConfirmIcon,
  ModalButton,
  ModalView,
  TopHalf,
  WarningText,
};
