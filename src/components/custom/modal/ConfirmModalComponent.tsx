import React from 'react';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { FONTSIZE, ICONSIZE } from '../../../globals/styles/typography';

interface ConfirmModalComponentProps {
  isModalVisible: boolean;
  warningText: string;
  cancelButtonLabel: string;
  confirmButtonLabel: string;
  confirmIcon?: string;
  handleModalCancel: () => void;
  handleModalConfirm: () => void;
}

/**
 * Renders a confirm modal component.
 *
 * @param {ConfirmModalComponentProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const ConfirmModalComponent = (props: ConfirmModalComponentProps) => {
  return (
    <Modal
      isVisible={props.isModalVisible}
      animationIn="zoomIn"
      animationInTiming={300}
      animationOut="zoomOut"
      animationOutTiming={300}
      backdropColor="black"
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      useNativeDriver={true}
    >
      <ModalView>
        <TopHalf>
          <WarningText>{props.warningText}</WarningText>
        </TopHalf>
        <BottomHalf>
          <ModalButton
            onPress={props.handleModalCancel}
            color="cancel"
          >
            <ButtonText>{props.cancelButtonLabel}</ButtonText>
          </ModalButton>
          <ModalButton
            onPress={props.handleModalConfirm}
            color="confirm"
          >
            {props.confirmIcon && (
              <ConfirmIcon
                name={props.confirmIcon}
                size={ICONSIZE.SMALL}
              />
            )}
            <ButtonText>{props.confirmButtonLabel}</ButtonText>
          </ModalButton>
        </BottomHalf>
      </ModalView>
    </Modal>
  );
};

const ModalView = styled.View`
  height: 200px;
  justify-content: center;
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
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
`;

const WarningText = styled.Text`
  color: ${(props) => props.theme.text};
  font-weight: bold;
  padding: 10px;
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
  margin: 0 5px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.text};
  font-weight: bold;
  font-size: ${FONTSIZE.MEDIUM}px;
  text-align: center;
`;

const ConfirmIcon = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.icon};
  margin-right: 10px;
`;

export default ConfirmModalComponent;
