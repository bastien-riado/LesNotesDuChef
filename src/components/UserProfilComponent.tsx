import React, { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { FONTSIZE } from '../globals/styles/typography';
import { UserProfilState } from '../models/UserProfilStateModels';
import {
  handleImageSelection,
  openCamera,
  openGallery,
} from '../services/ImageSelectionService';
import { updateUserProfileImageInDatabase } from '../services/UserService';
import { setUserProfilImage } from '../store/userProfil/actions';

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

  const nbOptions = imageOptions.length;
  const snapPoint = nbOptions * 12.5 + '%';
  const snapPoints = useMemo(() => [snapPoint], [snapPoint]);

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
        enableDynamicSizing
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

const Container = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  border-radius: 10px;
  margin-bottom: 12px;
`;

const ProfileTouchable = styled.TouchableOpacity``;

const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-right: 10px;
  margin-left: 10px;
`;

const EmailText = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  flex-shrink: 1;
  flex-wrap: wrap;
  max-width: 80%;
`;

const CustomBottomSheetModal = styled(BottomSheetModal).attrs((props) => ({
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backgroundStyle: {
    backgroundColor: props.theme.backgroundPrimary,
  },
  handleIndicatorStyle: {
    backgroundColor: props.theme.text,
  },
}))``;

const MenuItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding: 20px;
  width: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundSecondary};
`;

const MenuItemText = styled.Text`
  font-size: ${FONTSIZE.MEDIUM}px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;

const CustomBottomSheetView = styled(BottomSheetView)`
  flex: 1;
  align-items: center;
  padding: 20px;
`;

const SubMenuContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

export default UserProfilComponent;
