import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
        main: '#363636',
      },
      secondary: {
        main: '#ffffff',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#363636',
      },
  },
}));

export default theme;