import { DatePicker } from 'material-ui-pickers';
import React from 'react';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import moment from 'moment';
import './../styles/Form.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import teal from '@material-ui/core/colors/teal';

const materialTheme = createMuiTheme({
  palette: {
    primary: teal,
  },
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true,
  }
});

export default class DatePickers extends React.Component {
  state = {
    selectedDate: new Date(),
  }

  componentDidMount(){
    this.setState({
      selectedDate: this.props.defaultValue
    });
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
    this.props.handleDateChange(this.props.type, date);
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MuiThemeProvider theme={materialTheme}>
          <div className="datePicker">
            {this.props.isMaxDate && this.props.isMinDate &&
              <DatePicker
              label={this.props.label}
              maxDate={moment().add(90, 'days').calendar()}
              minDate={moment().add(-30, 'days').calendar()}
              format="Do MMM YYYY"
              value={selectedDate}
              showTodayButton={true}
              onChange={this.handleDateChange}
              animateYearScrolling
            />}
            {!this.props.isMaxDate && !this.props.isMinDate &&
              <DatePicker
              label={this.props.label}
              className="row"
              format="Do MMM YYYY"
              value={selectedDate}
                showTodayButton={true}
              onChange={this.handleDateChange}
              animateYearScrolling
            />}
          </div>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}
