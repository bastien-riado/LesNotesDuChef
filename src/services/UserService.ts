import { dbRef } from './Auth/config/FirebaseConfig';

export const updateUserProfileImageInDatabase = async (
  uid: string,
  downloadURL: string,
) => {
  try {
    await dbRef.ref(`/users/${uid}`).update({ profilImage: downloadURL });
  } catch (error) {
    console.error('Error updating profile image in database:', error);
    throw error;
  }
};
