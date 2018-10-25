import React from 'react';
import { Autocomplete, Col } from 'react-materialize';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './../styles/Form.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';

const materialTheme = createMuiTheme({
  palette: {
   primary: teal
 },
 typography: {
   useNextVariants: true,
   suppressDeprecationWarnings: true,
 }
});

export default class Background extends React.Component{
  constructor(props){
    super(props);
    this.state= {
        selectedValue: 'preferred'
    }
    this.deleteBackground = this.deleteBackground.bind(this);
    this.setSelectedBackground = this.setSelectedBackground.bind(this);
    this.setCheckedInput = this.setCheckedInput.bind(this);

  }

  deleteBackground(value){
    this.props.deleteBackground(value);
  }

  setSelectedBackground(value){
    this.props.setSelectedBackground(value, this.state.selectedValue);
  }

  setCheckedInput = event => {
    this.setState({ selectedValue: event.target.value });
  };

  render() {
      return (
        <MuiThemeProvider theme={materialTheme}>
          <Autocomplete
              s={12}
             title={this.props.labelName}
             data={
               this.props.background
             }
             value=''
             onAutocomplete={value => this.setSelectedBackground(value)}
           />
           <Col s={12} className='selection'>
              <RadioGroup
                    name="background"
                    value={this.state.selectedValue}
                    onChange={this.setCheckedInput}
                    className="formInput">
                  <FormControlLabel value="preferred" control={<Radio color="primary"/>} label="Preferred" />
                  <FormControlLabel value="required" control={<Radio color="primary" />}  label="Required" />
              </RadioGroup>
           </Col>
           <Col s={0}>
              {this.props.selectedBackground.map(bg => {
                return (
                  <Chip
                    key={bg.id}
                    label={bg.name}
                    onDelete={() => this.deleteBackground(bg)}
                    className={bg.option === 'required' ? "backgroundChip": "backgroundChip required"}
                  />
                );
              })}
           </Col>
         </MuiThemeProvider>
      );

    }
}
