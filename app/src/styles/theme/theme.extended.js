import { DefaultTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export const colorPalette = {
  turquoise: {
    t50: '#edf5f4',
    t100: '#ccf0f1',
    t200: '#94e7e0',
    t300: '#5acdbc',
    t400: '#00bf804d',
    tstandard: '#00bf80',
    t500: '#179669',
    t600: '#158052',
    t700: '#156241',
    t800: '#104432',
    t900: '#0b2a26',
  },
  gray: {
    g50: '#f8f9f7',
    g100: '#f3f3f3',
    g200: '#dddadf',
    g300: '#bbb7be',
    g400: '#949098',
    g500: '#786f76',
    g600: '#62545b',
    g700: '#4c3f46',
    g800: '#342c31',
    g900: '#211c20',
  },
  binary: {
    black: '#000000',
    white: '#ffffff',
  },
  red: {
    r50: '#fdfcfa',
    r100: '#fbf0ec',
    r200: '#f8cfd8',
    r300: '#eea2b1',
    r400: '#eb7288',
    r500: '#de4e65',
    r600: '#ff0000',
    r700: '#a02734',
    r800: '#731b22',
    r900: '#461113',
  },
  orange: {
    o50: '#fbfaf4',
    o100: '#f9efbb',
    o200: '#f1dc7f',
    o300: '#ffa500',
    o400: '#c08d2a',
    o500: '#a16e15',
    o600: '#84540d',
    o700: '#653f0c',
    o800: '#452b0b',
    o900: '#2e1b08',
  },
};

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    defaultBackgroundColor: colorPalette.binary.white,
    primaryBrandBackground: colorPalette.turquoise.t400,
    primaryBrand: colorPalette.turquoise.tstandard,
    brandFont: colorPalette.turquoise.tstandard,

    backgroundIcon: colorPalette.turquoise.tstandard,
    brandIcon: colorPalette.binary.white,

    primaryFont: colorPalette.binary.black,
    secondaryFont: colorPalette.binary.white,
    error: colorPalette.red.r600,

    primaryBackground: colorPalette.binary.white,
    warningBackground: colorPalette.orange.o50,
    warningBorder: colorPalette.orange.o300,

    primaryButtonBackground: colorPalette.turquoise.tstandard,
    primaryButtonFont: colorPalette.binary.white,

    ButtonBorder: colorPalette.turquoise.tstandard,

    secondaryButtonBackground: colorPalette.binary.white,
    secondaryButtonFont: colorPalette.turquoise.tstandard,
  },
  fontSize: {
    largeTitle: 34,
    headline: 22,
    title: 17,
    subHeadline: 15,
    paragraph: 17,
    link: 17,
    secondaryText: 15,
    tertiaryText: 13,
    caption: 13,
    formControls: 14,
    Buttons: 17,
    tabBarActionBar: 10,
  },
  borderRadius: 12,
  borderFormRadius: 4,
  circleRadius: 50,
  marginTop: 15,
  marginBottom: 15,
};

export const themeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.colors.defaultBackgroundColor,
  },
  sectionTitle: {
    paddingTop: 32,
    paddingBottom: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
