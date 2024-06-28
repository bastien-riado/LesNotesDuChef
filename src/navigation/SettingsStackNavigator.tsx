import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { COLORS } from '../globals/styles';
import { UserProfilState } from '../models/UserProfilStateModels';
import SettingsScreen from '../screens/SettingsScreen';
import { RootStackParamList } from './NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const SettingsStackNavigator = () => {
  const mode = useSelector(
    (state: { userProfil: UserProfilState }) => state.userProfil.mode,
  );
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.BG_SECONDARYCOLOR[mode] },
        headerTitleStyle: { color: COLORS.TEXTCOLOR[mode] },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t('UserProfil.Settings.Title') }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
