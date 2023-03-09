import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/arimo'
import '@fontsource/nunito-sans'
import Head from 'next/head';
import 'react-perfect-scrollbar/dist/css/styles.css';
// import {setGlobalState, useGlobalState} from '../globalStates/index'
import "../styles/globals.css"

const colors = {
  brand: {
    'primary': '#001d4b',
    'secundary': '#00e2ff',
    900: '#172951',
    800: '#00a8dc',
    700: '#00deff',
    200: '#e2e0e1'
  },
  primary: {
    100: "#C4DFF6",
    200: "#8EBEED",
    300: "#5088C9",
    400: "#245393",
    500: "#001D4B",
    600: "#001640",
    700: "#001036",
    800: "#000B2B",
    900: "#000824",
  },
  secundary: {
    100: "#CCFFF4",
    200: "#99FFF2",
    300: "#66FFF7",
    400: "#3FF8FF",
    500: "#00E2FF",
    600: "#00B0DB",
    700: "#0085B7",
    800: "#005F93",
    900: "#00457A",
  },
}

const styles = {
  global: {
    '&::-webkit-scrollbar': {
      width: '9px',
      height: '9px',
      borderRadius: '8px',
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
      borderRadius: '8px',
    },
    '_focus': {
      zIndex: 'unset !Important',
      borderColor: 'transparent ',
      boxShadow: 'none !Important',
    },
    Input: {
      boxShadow: '0px 0px 13px -9px rgba(0,0,0,1)'
    },
    Select: {
      boxShadow: '0px 0px 13px -9px rgba(0,0,0,1)'
    },
    Textarea: {
      boxShadow: '0px 0px 13px -9px rgba(0,0,0,1)',
    },
    Th: {
      background: 'blue.700',
      color: 'white !important',
      border: '1px solid black',
      fontSize: '11px !important',
      // borderRadius:'20px !important',

    },
    '.chakra-table__container': {
      borderRadius: '16px !important',
    },
    Td: {
      fontSize: "12px !important",
    },
    Box:{
      bg:'blue.700 !important'
    },
    Icon:{
      transition:'1s all linear'
    }
    // ".tablec":{
    //   borderRadius:'20px !important'
    // },




  },

}

const breakpoints = {
  sm: '30em', //min-width 480px
  md: '48em', //min-width 768px
  lg: '62em', //min-width 992px
  xl: '80em', //min-width 1280px
}

const fonts = {
  heading: 'Arimo, sans-serif',
  body: 'Arimo, sans-serif',
}

const fontScale = 0.8;
const fontSizes = {
  xs: `${0.75 * fontScale}rem`, //0.75rem
  sm: `${0.875 * fontScale}rem`, //0.875rem
  md: `${1 * fontScale}rem`, //1rem
  lg: `${1.125 * fontScale}rem`,// 1.125
  xl: `${1.250 * fontScale}rem`,//1.250
  "2xl": `${1.5 * fontScale}rem`,//1.5
  "3xl": `${1.875 * fontScale}rem`,//1.875
  "4xl": `${2.25 * fontScale}rem`,//2.25
  "5xl": `${3 * fontScale}rem`,//3
  "6xl": `${3.75 * fontScale}rem`,//3.75
  "7xl": `${4.5 * fontScale}rem`,//4.5
  "8xl": `${6 * fontScale}rem`,//6
  "9xl": `${8 * fontScale}rem`,//8
}
const radiiScale = 1;
const radii = {
  none: `0`,
  sm: `${0.125 * radiiScale}rem`,
  base: `${0.25 * radiiScale}rem`,
  md: `${0.375 * radiiScale}rem`,
  lg: `${0.5 * radiiScale}rem`,
  xl: `${0.75 * radiiScale}rem`,
  "2xl": `${1 * radiiScale}rem`,
  "3xl": `${1.25 * radiiScale}rem`,
  full: `9999px`,
}
const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

const lhScale = 1;
const lineHeights = {
  normal: "normal",
  none: 1 * lhScale,
  shorter: 1.25 * lhScale,
  short: 1.375 * lhScale,
  base: 1.5 * lhScale,
  tall: 1.625 * lhScale,
  taller: `${2 & lhScale}`,
  "3": `${0.75 * lhScale}rem`,
  "4": `${1 * lhScale}rem`,
  "5": `${1.25 & lhScale}rem`,
  "6": `${1.5 * lhScale}rem`,
  "7": `${1.75 * lhScale}rem`,
  "8": `${2 * lhScale}rem`,
  "9": `${2.25 * lhScale}rem`,
  "10": `${2.5 * lhScale}rem`,
}

const letterSpacings = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
}

const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 900,
  sticky: 1000,
  banner: 1100,
  overlay: 1200,
  modal: 1290,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
}

const components = {

  Checkbox: {
    defaultProps: {
      size: 'lg'
    }
  },


}

const sizeScale = 0.8;
const sizes = {
  px: `1px`,
  '0-5': `${0.125 * sizeScale}rem`,
  '1-5': `${0.375 * sizeScale}rem`,
  '2-5': `${0.625 * sizeScale}rem`,
  '3-5': `${0.875 * sizeScale}rem`,
  max: `max-content`,
  min: `min-content`,
  full: `100%`,
  '3xs': `${14 * sizeScale}rem`,
  '2xs': `${16 * sizeScale}rem`,
  xs: `${20 * sizeScale}rem`,
  sm: `${24 * sizeScale}rem`,
  md: `${28 * sizeScale}rem`,
  lg: `${32 * sizeScale}rem`,
  xl: `${36 * sizeScale}rem`,
  '2xl': `${42 * sizeScale}rem`,
  '3xl': `${48 * sizeScale}rem`,
  '4xl': `${56 * sizeScale}rem`,
  '5xl': `${64 * sizeScale}rem`,
  '6xl': `${72 * sizeScale}rem`,
  '7xl': `${80 * sizeScale}rem`,
  '8xl': `${90 * sizeScale}rem`,
  '1': `${0.25 * sizeScale}rem`,
  '2': `${0.5 * sizeScale}rem`,
  '3': `${0.75 * sizeScale}rem`,
  '4': `${1 * sizeScale}rem`,
  '5': `${1.25 * sizeScale}rem`,
  '6': `${1.50 * sizeScale}rem`,
  '7': `${1.75 * sizeScale}rem`,
  '8': `${2 * sizeScale}rem`,
  '9': `${1.25 * sizeScale}rem`,
  '10': `${2.5 * sizeScale}rem`,
  '12': `${3 * sizeScale}rem`,
  '14': `${3.5 * sizeScale}rem`,
  '16': `${4 * sizeScale}rem`,
  '20': `${5 * sizeScale}rem`,
  '24': `${6 * sizeScale}rem`,
  '28': `${7 * sizeScale}rem`,
  '32': `${8 * sizeScale}rem`,
  '36': `${9 * sizeScale}rem`,
  '40': `${10 * sizeScale}rem`,
  '44': `${11 * sizeScale}rem`,
  '48': `${12 * sizeScale}rem`,
  '52': `${13 * sizeScale}rem`,
  '56': `${14 * sizeScale}rem`,
  '60': `${15 * sizeScale}rem`,
  '64': `${16 * sizeScale}rem`,
  '72': `${18 * sizeScale}rem`,
  '80': `${20 * sizeScale}rem`,
  '96': `${24 * sizeScale}rem`,
  container: {
    sm: `${640}px`,
    md: `${768}px`,
    lg: `${1024}px`,
    xl: `${1280}px`,
  },

}

//const theme = extendTheme({ colors, styles, fonts, fontWeights, lineHeights, letterSpacings, breakpoints, zIndices, radii, components })
const theme = extendTheme({ colors, styles, fonts, sizes, fontSizes, fontWeights, lineHeights, letterSpacings, breakpoints, zIndices, radii, components })

function MyApp({ Component, pageProps }) {

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta httpEquiv="Content-Language" content="pt-br" />
      </Head>
      <Component {...pageProps} />

    </ChakraProvider>
  )
}


export default MyApp