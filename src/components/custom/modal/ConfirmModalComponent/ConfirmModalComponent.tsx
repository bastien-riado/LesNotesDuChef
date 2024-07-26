import React from 'react';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { FONTSIZE, ICONSIZE } from '../../../../globals/styles/typography';
import {
  BottomHalf,
  ButtonText,
  ConfirmIcon,
  ModalButton,
  ModalView,
  TopHalf,
  WarningText,
} from './styles';

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

export default ConfirmModalComponent;
