import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
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
  EmailText,
  MenuItem,
  MenuItemText,
  MenuScrollView,
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
      async () => {},
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

  return (
    <Container>
      <ProfileTouchable onPress={handlePresentModalPress}>
        <ProfileImage source={{ uri: profilImage || defaultImage }} />
      </ProfileTouchable>
      <EmailText>{email}</EmailText>
      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <MenuScrollView>
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
        </MenuScrollView>
      </CustomBottomSheetModal>
    </Container>
  );
};

export default UserProfilComponent;
