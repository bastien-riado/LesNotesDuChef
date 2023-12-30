import React, {createContext, useState} from 'react';

export const UserProfile = createContext({});

export const UserProfileProvider = ({children}: any) => {
  const [userDisplayName, setUserDisplayName] = useState('');

  return (
    <UserProfile.Provider
      value={{
        userDisplayName,
        setUserDisplayName,
      }}
    >
      {children}
    </UserProfile.Provider>
  );
};
