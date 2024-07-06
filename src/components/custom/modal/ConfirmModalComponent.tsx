import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../globals/styles';
import { ICONSIZE } from '../../../globals/styles/typography';
import { Mode, UserProfilState } from '../../../models/UserProfilStateModels';

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
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const themedStyle = useMemo(() => styles(mode), [mode]);

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
      <View style={themedStyle.modalView}>
        <Text style={themedStyle.warningText}>{props.warningText}</Text>
        <View style={themedStyle.modalButtonView}>
          <TouchableOpacity
            onPress={props.handleModalCancel}
            style={[themedStyle.modalButton, themedStyle.cancel]}
          >
            <Text style={themedStyle.buttonText}>{props.cancelButtonLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.handleModalConfirm}
            style={[themedStyle.modalButton, themedStyle.confirm]}
          >
            {props.confirmIcon && (
              <MaterialCommunityIcons
                name={props.confirmIcon}
                size={ICONSIZE.SMALL}
                style={themedStyle.icon}
              />
            )}
            <Text style={themedStyle.buttonText}>{props.confirmButtonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    modalView: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
      borderRadius: 10,
      maxHeight: 200,
    },
    warningText: {
      color: COLORS.TEXTCOLOR[mode],
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
    },
    modalButtonView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    modalButton: {
      padding: 15,
      paddingLeft: 40,
      paddingRight: 40,
      borderRadius: 10,
      backgroundColor: COLORS.WARNING,
    },
    cancel: {
      backgroundColor: COLORS.BUTTONCOLOR[mode],
      elevation: 5,
    },
    confirm: {
      backgroundColor: COLORS.BGDELETE,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
    },
    buttonText: {
      color: COLORS.TEXTCOLOR[mode],
      fontWeight: 'bold',
    },
    icon: {
      color: COLORS.ICONCOLOR[mode],
      marginRight: 10,
    },
  });

export default ConfirmModalComponent;
