// components/ImageSelectionModalComponent.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import { FONTSIZE } from '../../../globals/styles/typography';
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

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      useNativeDriver={true}
    >
      <ModalContent>
        <ModalTitle>{t('UserProfil.Settings.ImageModal.Title')}</ModalTitle>
        <ModalButton onPress={() => openCamera(handleImageSelectionCallback)}>
          <ModalButtonText>
            {t('UserProfil.Settings.ImageModal.TakeButton')}
          </ModalButtonText>
        </ModalButton>
        <ModalButton onPress={() => openGallery(handleImageSelectionCallback)}>
          <ModalButtonText>
            {t('UserProfil.Settings.ImageModal.ChooseButton')}
          </ModalButtonText>
        </ModalButton>
        {isLoading && <CustomSpinner visible={isLoading} />}
      </ModalContent>
    </Modal>
  );
};

const CustomSpinner = styled(Spinner).attrs((props) => ({
  textStyle: { color: props.theme.text },
}))``;

const ModalContent = styled.View`
  background-color: ${(props) => props.theme.backgroundPrimary};
  padding: 20px;
  border-radius: 10px;
`;

const ModalTitle = styled.Text`
  font-size: ${FONTSIZE.LARGE}px;
  margin-bottom: 20px;
  text-align: center;
  color: ${(props) => props.theme.text};
`;

const ModalButton = styled.TouchableOpacity`
  padding: 15px;
`;

const ModalButtonText = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  text-align: center;
`;

export default ImageSelectionModalComponent;
