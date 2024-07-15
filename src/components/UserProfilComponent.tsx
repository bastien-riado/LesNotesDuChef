import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { FONTSIZE } from '../globals/styles/typography';
import { UserProfilState } from '../models/UserProfilStateModels';
import { updateUserProfileImageInDatabase } from '../services/UserService';
import { setUserProfilImage } from '../store/userProfil/actions';
import ImageSelectionModalComponent from './custom/modal/ImageSelectionModalComponent';

const UserProfilComponent: React.FC = () => {
  const { mode, email, uid, profilImage } = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil,
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const defaultImage = 'https://via.placeholder.com/150';

  const handleImageSelected = async (downloadURL: string) => {
    await updateUserProfileImageInDatabase(uid, downloadURL);
    dispatch(setUserProfilImage(downloadURL));
  };

  return (
    <Container>
      <ProfileTouchable onPress={() => setModalVisible(true)}>
        <ProfileImage source={{ uri: profilImage || defaultImage }} />
      </ProfileTouchable>
      <EmailText>{email}</EmailText>
      <ImageSelectionModalComponent
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        uid={uid}
        mode={mode}
        onImageSelected={handleImageSelected}
      />
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

export default UserProfilComponent;
