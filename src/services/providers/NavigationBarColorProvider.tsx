import React, { createContext, useContext, useEffect, useState } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useTheme } from 'styled-components/native';

const NavigationBarColorContext = createContext({
  setNavigationBarColor: (color: string) => {},
});

export const useNavigationBarColor = () => useContext(NavigationBarColorContext);

export const NavigationBarColorProvider = ({ children }: any) => {
  const theme = useTheme();
  const [color, setColor] = useState(theme.backgroundPrimary);

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(color);
  }, [color]);

  return (
    <NavigationBarColorContext.Provider value={{ setNavigationBarColor: setColor }}>
      {children}
    </NavigationBarColorContext.Provider>
  );
};
