import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuNavigation from './routes/menu.routes';

const App = () => {
  
    return (
        <NavigationContainer>
            <MenuNavigation />
        </NavigationContainer>
    );
}
export default App;
