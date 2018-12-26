import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DatePicker } from 'material-ui-pickers';
import Dropzone from 'react-dropzone';

import { styles } from './App.styles.js';
import logo from './logo.svg';


class App extends Component {
  state = {
    firstName: '',
    lastName: '',
    birthday: new Date().toJSON(),
    cellphone: '',
    picture: null,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('acceptedFiles', acceptedFiles);
    console.log('rejectedFiles', rejectedFiles);

    this.setState({ picture: acceptedFiles[0] });
  }

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
              <Typography className={classes.title} component="h1" variant="h5" gutterBottom>
                Perfil
              </Typography>
              <Grid container spacing={32}>
                <Grid item xs={6}>
                  <TextField
                    id="firstName"
                    label="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="lastName"
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    value={selectedDate}
                    onChange={this.handleChange('birthday')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Dropzone onDrop={this.onDrop}>
                    {({getRootProps, getInputProps, isDragActive}) => {
                      return (
                        <div {...getRootProps()} className={classes.dropZone}>
                          <input {...getInputProps()} />
                          {
                            isDragActive ?
                            <p>Drop files here...</p> :
                            <p>Try dropping your picture here, or click to select files to upload.</p>
                          }
                        </div>
                      )
                    }}
                  </Dropzone>
                  <p>{(this.state.picture && this.state.picture.name) || ''}</p>
                </Grid>

                <Grid item xs={12} className={classes.actions}>
                  <Button variant="contained" color="primary">Submit</Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
