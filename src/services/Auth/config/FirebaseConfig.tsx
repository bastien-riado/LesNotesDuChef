import {firebase} from '@react-native-firebase/database';

//refers to the root of the database
export const dbRef = firebase
  .app()
  .database(
    'https://lesnotesduchef-43c6f-default-rtdb.europe-west1.firebasedatabase.app/',
  );
