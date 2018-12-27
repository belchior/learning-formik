import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { DatePicker } from 'material-ui-pickers';
import Dropzone from 'react-dropzone';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import { styles } from './App.styles.js';
import logo from './logo.svg';

const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  date: Yup.date()
});

function getSteps() {
  return ['Name', 'Date', 'Image'];
}

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
    <TextField
      type="text"
      name={field.name}
      label={props.label}
      value={field.value}
      onChange={field.onChange}
      error={Boolean(touched[field.name] && errors[field.name])}
      helperText={
        touched[field.name] &&
        errors[field.name] && errors[field.name]
      }
      margin="normal"
      fullWidth
      inputProps={{
        onBlur: field.onBlur
      }}
    />
  );

class App extends Component {
  state = {
    firstName: '',
    lastName: '',
    birthday: new Date().toJSON(),
    cellphone: '',
    activeStep: 0,
    picture: null,
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('acceptedFiles', acceptedFiles);
    console.log('rejectedFiles', rejectedFiles);
    this.props.setFieldValue('file', acceptedFiles[0]);
    this.props.setFieldTouched('file');
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const steps = getSteps();
    return (
      <div className={classes.App}>
        <header className={classes.AppHeader}>
          <img src={logo} className={classes.AppLogo} alt="logo" />
        </header>

        <div className={classes.container}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} classes={{ root: classes.stepper }}>
              {steps.map((label) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <form encType="multipart/form-data" className={classes.form}>
              <Grid container spacing={32}>
                {
                  activeStep === 0 && (
                    <React.Fragment>
                      <Grid item xs={6}>
                        <Field
                          name="firstName"
                          label="First Name"
                          component={CustomInputComponent}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          name="lastName"
                          label="Last Name"
                          component={CustomInputComponent}
                        />
                      </Grid>
                    </React.Fragment>
                  )
                }
                {
                  activeStep === 1 && (
                    <Grid item xs={12}>
                      <Field
                        name="date"
                        render={({ field, form }) => (
                          <DatePicker
                            label="Masked input"
                            format="dd/MM/yyyy"
                            value={field.value}
                            onChange={val => this.props.setFieldValue('date', val)}
                            onClose={() => this.props.setFieldTouched('date')}
                          />
                        )}
                      />

                    </Grid>
                  )
                }
                {
                  activeStep === 2 && (
                    <Grid item xs={12}>
                      <Field
                        name="file"
                        render={({ field, form }) => (
                          <React.Fragment>
                            <Dropzone onDrop={this.onDrop}>
                              {({ getRootProps, getInputProps, isDragActive }) => {
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
                            <p>{(form.values.file && form.values.file.name) || ''}</p>
                          </React.Fragment>
                        )}
                      />
                    </Grid>
                  )
                }
              </Grid>
            </form>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
              </Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
              </Button>
                </div>
              ) : (
                  <div>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                )}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({
    firstName: '',
    lastName: '',
    date: new Date()
  }),

  // Custom sync validation
  validationSchema: FormSchema,

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: 'BasicForm',
})(App);

export default withStyles(styles)(MyEnhancedForm);
