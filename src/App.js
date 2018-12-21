import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from 'material-ui-pickers';

import { styles } from './App.styles.js';
import logo from './logo.svg';


class App extends Component {
  state = {
    selectedDate: new Date(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <div className={classes.App}>
        <header className={classes.AppHeader}>
          <img src={logo} className={classes.AppLogo} alt="logo" />
        </header>

        <div className={classes.container}>
          <Paper className={classes.paper}>
            <form encType="multipart/form-data">
              <DatePicker value={selectedDate} onChange={this.handleDateChange} />
            </form>
          </Paper>
          <Grid container spacing={24}>
            <Grid item xs={12}>

            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
