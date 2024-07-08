import storage from '@react-native-firebase/storage';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { Mode, UserProfilState } from '../models/UserProfilStateModels';
import { updateUserProfileImageInDatabase } from '../services/UserService';
import { setUserProfilImage } from '../store/userProfil/actions';

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
  const [isLoading, setIsLoading] = useState(false);
  const themedStyle = useMemo(() => styles(mode), [mode]);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const defaultImage = 'https://via.placeholder.com/150'; // URL de l'image par défaut

  const handleImageSelection = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const source = response.assets[0].uri as string;
      try {
        setIsLoading(true);
        const downloadURL = await uploadImageToFirebase(source);
        await updateUserProfileImageInDatabase(uid, downloadURL);
        dispatch(setUserProfilImage(downloadURL));
        setModalVisible(false);
      } catch (error) {
        console.error('Error uploading image: ', error);
      }
      setIsLoading(false);
    }
  };

  const openCamera = () => {
    const options: ImageLibraryOptions = { mediaType: 'photo', quality: 1 };
    launchCamera(options, handleImageSelection);
  };

  const openGallery = () => {
    const options: ImageLibraryOptions = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, handleImageSelection);
  };

  const uploadImageToFirebase = async (uri: string) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`images/users/${uid}/${filename}`);
    const task = storageRef.putFile(uri);

    await task;
    return await storageRef.getDownloadURL();
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

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriver={true}
      >
        <View style={themedStyle.modalContent}>
          <Text style={themedStyle.modalTitle}>
            {t('UserProfil.Settings.ImageModal.Title')}
          </Text>
          <TouchableOpacity
            style={themedStyle.modalButton}
            onPress={openCamera}
          >
            <Text style={themedStyle.modalButtonText}>
              {t('UserProfil.Settings.ImageModal.TakeButton')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={themedStyle.modalButton}
            onPress={openGallery}
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

export default UserProfilComponent;
