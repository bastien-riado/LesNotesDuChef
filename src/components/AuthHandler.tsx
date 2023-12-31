import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import LoginScreen from '../screens/authScreens/LoginScreen';
import RecipesScreen from '../screens/RecipesScreen';

type User = FirebaseAuthTypes.User;

const AuthHandler = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser: User | null) => {
      setUser(authUser);
      setLoading(false);
    });

    // Clean up function
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <RecipesScreen /> : <LoginScreen />;
};

export default AuthHandler;
