import {scaleFont} from './mixins';

export const ICONSIZE = {SMALL: 20, MEDIUM: 30, LARGE: 40};

//font family
export const FONT_FAMILY_REGULAR = 'Roboto-Regular';
export const FONT_FAMILY_MEDIUM = 'Roboto-Medium';
export const FONT_FAMILY_BOLD = 'Roboto-Bold';

//font weight
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_MEDIUM = '500';
export const FONT_WEIGHT_BOLD = '700';

//font size
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_18 = scaleFont(18);

//line height
export const LINE_HEIGHT_16 = scaleFont(16);
export const LINE_HEIGHT_18 = scaleFont(18);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_22 = scaleFont(22);

//font style
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};
export const FONT_MEDIUM = {
  fontFamily: FONT_FAMILY_MEDIUM,
  fontWeight: FONT_WEIGHT_MEDIUM,
};
export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};
