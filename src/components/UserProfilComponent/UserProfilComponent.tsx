import React, { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Dimensions } from 'react-native';
import { vs } from 'react-native-size-matters';
import { UserProfilState } from '../../models/UserProfilStateModels';
import {
  handleImageSelection,
  openCamera,
  openGallery,
} from '../../services/ImageSelectionService';
import { updateUserProfileImageInDatabase } from '../../services/UserService';
import { setUserProfilImage } from '../../store/userProfil/actions';
import {
  Container,
  CustomBottomSheetModal,
  CustomBottomSheetView,
  EmailText,
  MenuItem,
  MenuItemText,
  ProfileImage,
  ProfileTouchable,
  SubMenuContainer,
} from './styles';

const UserProfilComponent: React.FC = () => {
  const { email, uid, profilImage } = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil,
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const defaultImage = 'https://via.placeholder.com/150';

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleImageSelectionCallback = (response: any) => {
    handleImageSelection(
      response,
      uid,
      () => {},
      async (downloadURL: string) => {},
      async (downloadURL: string) => {
        await updateUserProfileImageInDatabase(uid, downloadURL);
        dispatch(setUserProfilImage(downloadURL));
        bottomSheetModalRef.current?.close();
      },
      (error: any) => console.error('Error uploading image: ', error),
    );
  };

  const imageOptions = [
    {
      text: t('UserProfil.Settings.ImageModal.TakeButton'),
      onPress: () => openCamera(handleImageSelectionCallback),
    },
    {
      text: t('UserProfil.Settings.ImageModal.ChooseButton'),
      onPress: () => openGallery(handleImageSelectionCallback),
    },
  ];

  const windowHeight = Dimensions.get('window').height;
  const modalHeight = vs(imageOptions.length * 50);
  const maxModalHeight = vs(windowHeight * 0.5);

  const snapPoints = useMemo(() => {
    const height = Math.min(modalHeight, maxModalHeight);
    return [height + 60];
  }, [modalHeight, maxModalHeight]);

  return (
    <Container>
      <ProfileTouchable onPress={handlePresentModalPress}>
        <ProfileImage source={{ uri: profilImage || defaultImage }} />
      </ProfileTouchable>
      <EmailText>{email}</EmailText>
      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <CustomBottomSheetView>
          <SubMenuContainer>
            {imageOptions.map((option, index) => (
              <MenuItem
                key={index}
                onPress={option.onPress}
              >
                <MenuItemText>{option.text}</MenuItemText>
              </MenuItem>
            ))}
          </SubMenuContainer>
        </CustomBottomSheetView>
      </CustomBottomSheetModal>
    </Container>
  );
};

export default UserProfilComponent;
