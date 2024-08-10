import { View } from 'react-native';
import { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { TYPO } from './src/globals/styles';

const toastConfig = {
  success: (props: BaseToastProps) => {
    const theme = useTheme();
    return (
      <BaseToast
        {...props}
        text1Style={{
          fontSize: 18,
          color: theme.text,
        }}
        text1NumberOfLines={0}
        text2Style={{
          fontSize: 14,
        }}
        text2NumberOfLines={0}
        style={{
          borderLeftColor: theme.success,
          borderLeftWidth: 8,
          minHeight: 80,
        }}
        contentContainerStyle={{
          backgroundColor: theme.backgroundPrimary,
        }}
        renderTrailingIcon={() => (
          <View
            style={{
              backgroundColor: theme.backgroundPrimary,
              justifyContent: 'center',
              paddingRight: 10,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <MaterialCommunityIcons
              name="check-circle"
              size={TYPO.ICONSIZE.LARGE}
              color={theme.success}
            />
          </View>
        )}
      />
    );
  },

  error: (props: BaseToastProps) => {
    const theme = useTheme();
    return (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 18,
          color: theme.text,
        }}
        text1NumberOfLines={0}
        text2Style={{
          fontSize: 14,
        }}
        text2NumberOfLines={0}
        style={{
          borderLeftColor: theme.alert,
          borderLeftWidth: 10,
          minHeight: 80,
        }}
        contentContainerStyle={{
          backgroundColor: theme.backgroundPrimary,
        }}
        renderTrailingIcon={() => (
          <View
            style={{
              backgroundColor: theme.backgroundPrimary,
              justifyContent: 'center',
              paddingRight: 10,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <MaterialCommunityIcons
              name="alert"
              size={TYPO.ICONSIZE.LARGE}
              color={theme.alert}
            />
          </View>
        )}
      />
    );
  },
};

export default toastConfig;
