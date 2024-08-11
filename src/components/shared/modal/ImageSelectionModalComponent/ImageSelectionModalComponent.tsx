import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';

import { Mode } from '../../../../models/UserProfilStateModels';
import {
  handleImageSelection,
  openCamera,
  openGallery,
} from '../../../../services/ImageSelectionService';
import {
  CustomSpinner,
  ModalButton,
  ModalButtonText,
  ModalContent,
  ModalTitle,
} from './styles';

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

export default ImageSelectionModalComponent;
