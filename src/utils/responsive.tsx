import { Dimensions } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

export const responsive = {
  wp,
  hp,
  width,
  height,
};
