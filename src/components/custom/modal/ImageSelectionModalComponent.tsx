// components/ImageSelectionModalComponent.tsx
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import { COLORS } from '../../../globals/styles';
import { Mode } from '../../../models/UserProfilStateModels';
import {
  handleImageSelection,
  openCamera,
  openGallery,
} from '../../../services/ImageSelectionService';

interface ImageSelectionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onImageSelected: (imageUri: string) => void;
  mode: Mode;
  uid: string;
}

const ImageSelectionModalComponent: React.FC<ImageSelectionModalProps> = ({
  isVisible,
  onClose,
  uid,
  mode,
  onImageSelected,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelectionCallback = (response: any) => {
    handleImageSelection(
      response,
      uid,
      setIsLoading,
      async (downloadURL: string) => {},
      (downloadURL: string) => {
        onImageSelected(downloadURL);
        onClose();
      },
      (error: any) => console.error('Error uploading image: ', error),
    );
  };

  const themedStyle = useMemo(() => styles(mode), [mode]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      useNativeDriver={true}
    >
      <View style={themedStyle.modalContent}>
        <Text style={themedStyle.modalTitle}>
          {t('UserProfil.Settings.ImageModal.Title')}
        </Text>
        <TouchableOpacity
          style={themedStyle.modalButton}
          onPress={() => openCamera(handleImageSelectionCallback)}
        >
          <Text style={themedStyle.modalButtonText}>
            {t('UserProfil.Settings.ImageModal.TakeButton')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={themedStyle.modalButton}
          onPress={() => openGallery(handleImageSelectionCallback)}
        >
          <Text style={themedStyle.modalButtonText}>
            {t('UserProfil.Settings.ImageModal.ChooseButton')}
          </Text>
        </TouchableOpacity>
        {isLoading && (
          <Spinner
            visible={isLoading}
            textStyle={{ color: COLORS.TEXTCOLOR[mode] }}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: COLORS.BG_PRIMARYCOLOR[mode],
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
      color: COLORS.TEXTCOLOR[mode],
    },
    modalButton: {
      padding: 15,
    },
    modalButtonText: {
      fontSize: 18,
      color: COLORS.TEXTCOLOR[mode],
      textAlign: 'center',
    },
  });

export default ImageSelectionModalComponent;
