import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
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
import AutocompleteComponent from './AutocompleteComponent'
import { Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const FILE_SIZE = 300000;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
];
const sellectables = [
  { value: 'Afghanistan', label: 'Afghanistan' },
  { value: 'Aland Islands', label: 'Aland Islands' },
  { value: 'Albania', label: 'Albania' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'Austria', label: 'Austria' },
  { value: 'Azerbaijan', label: 'Azerbaijan' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'Bahrain', label: 'Bahrain' },
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'Barbados', label: 'Barbados' },
  { value: 'Belarus', label: 'Belarus' },
  { value: 'Belgium', label: 'Belgium' },
];


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
    .required('Required'),
  file: Yup.mixed()
    .test('fileSize', "File Size is too large", value => value.size <= FILE_SIZE)
    .test('fileType', "Unsupported File Format", value => SUPPORTED_FORMATS.includes(value.type)),
  optional: Yup.boolean(),
  optionaltextField: Yup.string()
    .when('optional', {
      is: true,
      then: Yup.string().required('Required').min(2, 'Too Short')
    }),
  select: Yup.string()
    .min(1, 'Select an Option!')
    .required('Required'),
});

function getSteps() {
  return ['Name', 'Date', 'Image', 'Optional', 'autocomplete', 'select'];
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

const CustomCheckboxComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={field.value}
          name={field.name}
          label={props.label}
          value={String(field.value)}
          onChange={field.onChange}
        />
      }
      label={field.name}
    />
  );

  const CustomSelectComponent = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => (
    <FormControl fullWidth error={Boolean(touched[field.name] && errors[field.name])}>
      <InputLabel htmlFor={field.name}>{props.label}</InputLabel>
      <Select
        name={field.name}
        id={field.name}
        value={field.value}
        onChange={field.onChange}
        inputProps={{
          onBlur: field.onBlur
        }}
      >
      {
        props.list.map(options => (
          <MenuItem value={options.value} key={options.value}>{options.label}</MenuItem>
        )   
          )
      }
      </Select>
      {
        (touched[field.name] && errors[field.name]) && <FormHelperText>{errors[field.name]}</FormHelperText>
      }
    </FormControl>
    );

class App extends Component {
  state = {
    activeStep: 5,
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
    this.props.setFieldValue('file', acceptedFiles[0]);
    this.props.setFieldTouched('file');
  }

  render() {
    const { classes, errors } = this.props;
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
                        render={({
                          field,
                          form: { touched, errors },
                        }) => (
                            <DatePicker
                              emptyLabel="Pick a date"
                              keyboard={false}
                              label="Masked input"
                              format="dd/MM/yyyy"
                              value={field.value}
                              onError={(_, error) => this.props.setFieldError(field.name, error)}
                              onChange={val => this.props.setFieldValue('date', val)}
                              onClose={() => this.props.setFieldTouched('date')}
                              error={Boolean(touched[field.name] && errors[field.name])}
                              helperText={
                                touched[field.name] &&
                                errors[field.name] && errors[field.name]
                              }
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
                        render={({
                          form: { touched, errors },
                          field: { value }
                        }) => (
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
                              <p>{(value && value.name) || ''}</p>
                              <p style={{ color: 'red' }}>{
                                touched['file'] &&
                                errors['file'] && errors['file']
                              }</p>
                            </React.Fragment>
                          )}
                      />
                    </Grid>
                  )
                }
                {
                  activeStep === 3 && (
                    <Grid item xs={12}>
                      <React.Fragment>
                        <Field
                          name="optional"
                          label="Optional"
                          component={CustomCheckboxComponent}
                        />
                        {
                          this.props.values.optional &&
                          <Field
                            name="optionaltextField"
                            label="Optional Text Field"
                            component={CustomInputComponent}
                          />
                        }
                      </React.Fragment>
                    </Grid>
                  )
                }
                {
                  activeStep === 4 && (
                    <Grid item xs={12}>
                      <React.Fragment>
                        <Field
                          name="autocomplete"
                          label="Autocomplete"
                          suggestions={suggestions}
                          component={AutocompleteComponent}
                        />
                      </React.Fragment>
                    </Grid>
                  )
                }
                {
                  activeStep === 5 && (
                  <React.Fragment>
                    <Grid item xs={12}>
                    <Field
                      name="select"
                      label="Select"
                      list={sellectables}
                      component={CustomSelectComponent}
                    />
                  </Grid>
                </React.Fragment>
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
                        disabled={Boolean(activeStep === steps.length - 1)}
                      >
                        Next
                      </Button>
                      {
                        activeStep === 5 && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.props.handleSubmit}
                            className={classes.button}
                            disabled={!this.props.dirty || !isEmpty(errors)}
                          >
                            {this.props.isSubmitting ? 'Sending...' : 'Send'}
                          </Button>
                        )
                      }
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
    date: null,
    file: {},
    optional: false,
    optionaltextField: '',
    autocomplete: '',
    select: '',
  }),

  // Custom sync validation
  validationSchema: (props) => FormSchema,

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: 'BasicForm',
})(App);

export default withStyles(styles)(MyEnhancedForm);
