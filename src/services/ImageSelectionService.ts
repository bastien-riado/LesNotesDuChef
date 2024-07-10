import storage from '@react-native-firebase/storage';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const uploadImageToFirebase = async (uri: string, uid: string) => {
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const storageRef = storage().ref(`images/users/${uid}/${filename}`);
  const task = storageRef.putFile(uri);

  await task;
  return await storageRef.getDownloadURL();
};

const handleImageSelection = async (
  response: ImagePickerResponse,
  uid: string,
  setIsLoading: (loading: boolean) => void,
  updateUserProfileImage: (url: string) => Promise<void>,
  onImageUploaded: (url: string) => void,
  onError: (error: any) => void,
) => {
  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.errorCode) {
    console.log('ImagePicker Error: ', response.errorMessage);
  } else if (response.assets && response.assets.length > 0) {
    const source = response.assets[0].uri as string;
    try {
      setIsLoading(true);
      const downloadURL = await uploadImageToFirebase(source, uid);
      await updateUserProfileImage(downloadURL);
      onImageUploaded(downloadURL);
    } catch (error) {
      console.error('Error uploading image: ', error);
      onError(error);
    }
    setIsLoading(false);
  }
};

const openCamera = (
  handleImageSelectionCallback: (response: ImagePickerResponse) => void,
) => {
  const options: ImageLibraryOptions = { mediaType: 'photo', quality: 1 };
  launchCamera(options, handleImageSelectionCallback);
};

const openGallery = (
  handleImageSelectionCallback: (response: ImagePickerResponse) => void,
) => {
  const options: ImageLibraryOptions = { mediaType: 'photo', quality: 1 };
  launchImageLibrary(options, handleImageSelectionCallback);
};

export { handleImageSelection, openCamera, openGallery, uploadImageToFirebase };
