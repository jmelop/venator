import { colors } from './colors';
import { typography } from './typography';
import { borderRadius, shadows, breakpoints } from './scales';

export const venatorPreset = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        neutral: {
          ...colors.neutral,
          950: '#0a0a0a',
        },
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
      },
      fontFamily: {
        sans: [typography.fontFamily.sans],
        mono: [typography.fontFamily.mono],
      },
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      borderRadius,
      boxShadow: shadows,
      screens: breakpoints,
    },
  },
};

export type VenatorPreset = typeof venatorPreset;
