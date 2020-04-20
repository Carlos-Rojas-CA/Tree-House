import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    h3: {
      fontFamily: [
        'Oleo Script',
        'Capriola',
        'Mandali',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
    },
    // body1: {
    //   fontWeight: 500,
    // },
    // button: {
    //   fontStyle: 'italic',
    // },
  },
  palette: {
    primary: {
      main: '#0E981C',
      // light: '#9bbaca',
      // dark: '#1a2a32',
    },
    secondary: {
        main: '#FFF9F3',
        contrastText: '#ffffff',
    },
    // whte:{
    //   main: 'white'
    // }
    // background: {
    //     paper: '#e0e0e0',
    //     default: '#e0e0e0',
    // }
    /*
    success: {
        main: '#ccff90',
        contrastText: '#eeeeee'
    }
    */
  },
});


export default theme;