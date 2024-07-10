// components/UserProfilComponent.tsx
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { updateUserProfileImageInDatabase } from '../services/UserService';
import { setUserProfilImage } from '../store/userProfil/actions';
import ImageSelectionModalComponent from './custom/modal/ImagePickerModalComponent';

const UserProfilComponent: React.FC = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const email = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.email,
  );
  const uid = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.uid,
  );
  const profilImage = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.profilImage,
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const themedStyle = useMemo(() => styles(mode), [mode]);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const defaultImage = 'https://via.placeholder.com/150';

  const handleImageSelected = async (downloadURL: string) => {
    await updateUserProfileImageInDatabase(uid, downloadURL);
    dispatch(setUserProfilImage(downloadURL));
  };

  return (
    <View style={themedStyle.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={{ uri: profilImage || defaultImage }}
          style={themedStyle.profileImage}
        />
      </TouchableOpacity>

      <Text style={themedStyle.emailText}>{email}</Text>

      <ImageSelectionModalComponent
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        uid={uid}
        mode={mode}
        onImageSelected={handleImageSelected}
      />
    </View>
  );
};

const styles = (mode: Mode) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    emailText: {
      fontSize: 16,
      color: COLORS.TEXTCOLOR[mode],
    },
  });

export default UserProfilComponent;
