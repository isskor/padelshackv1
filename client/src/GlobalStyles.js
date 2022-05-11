import withStyles from '@material-ui/core/styles/withStyles';

const GlobalStyles = withStyles({
  '@global': {
    // Declare a @global selector in order for jss to pull out the styles
    'html, body': {
      // create your styles to apply globally
      margin: 0,
      padding: 0,
      backgroundColor: '#pink',
    },
    '.MuiFormControl-root': {
      width: '100%',
      margin: '1rem 0',
    },
    '.MuiCardContent-root:last-child': {
      paddingBottom: '0',
    },
  },
})(() => null);

export default GlobalStyles;
