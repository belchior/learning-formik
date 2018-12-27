
export const styles = theme => ({
  App: {
  },
  AppLogo: {
    animation: 'App-logo-spin infinite 20s linear',
    height: '3rem',
  },
  AppHeader: {
    textAlign: 'center',
    backgroundColor: '#282c34',
    display: 'flex',
    marginBottom: theme.spacing.unit * 6,
    height: '4rem',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  container: {
    display: 'table',
    margin: 'auto',
    width: '100%',
    maxWidth: theme.spacing.unit * 72,
  },
  paper: {
    padding: theme.spacing.unit * 3,
    color: theme.palette.text.secondary,
  },
  title: {
    textAlign: 'center',
  },
  dropZone: {
    border: '1px solid',
    padding: theme.spacing.unit * 3,
  },
  actions: {
    textAlign: 'right',
  },
  form: {
    padding: '40px 0',
  },
  stepper: {
    padding: 0,
  },
  '@keyframes App-logo-spin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  }
});
