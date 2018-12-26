import React from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
// import locale from '@date-io/date-fns/locale/pt-BR';
import './index.css';
import App from './App';

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <App />,
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
);
