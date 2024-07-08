import { dbRef } from './Auth/config/FirebaseConfig';

export const updateUserProfileImageInDatabase = async (
  uid: string,
  downloadURL: string,
) => {
  await dbRef.ref(`/users/${uid}`).update({ profilImage: downloadURL });
};
