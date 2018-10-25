import React from 'react';
import { Col, Chip, Autocomplete } from 'react-materialize';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './../styles/Form.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';

function SkillChip(props) {
  const skills = props.skills;
  const skillItems = skills.map((skill) =>
    <Chip className={skill.option === 'required'? "chip required" : (skill.option === 'featured'? "chip featured":"chip")} key={skill.id}>
      {skill.name}
    </Chip>
  );
  return (
    <ul>{skillItems}</ul>
  );
}

const materialTheme = createMuiTheme({
  palette: {
   primary: teal
 },
 typography: {
   useNextVariants: true,
   suppressDeprecationWarnings: true,
 }
});

export default class Skills extends React.Component {
    constructor(props){
      super(props);
      this.state= {
          selectedValue: 'preferred',
          selectedLevel: "0"
      }
      this.setSelectedSkill = this.setSelectedSkill.bind(this);
      this.setCheckedInput = this.setCheckedInput.bind(this);
      }

      setSelectedSkill(value){
        this.props.setSelectedSkill(value, this.state.selectedValue, this.state.selectedLevel);
      }

      setCheckedInput = event => {
        this.setState({ selectedValue: event.target.value });
      };

      setSkillLevel = event => {
        this.setState({ selectedLevel: event.target.value });
      };


    render(){
       return (
        <MuiThemeProvider theme={materialTheme}>
          <Autocomplete
           s={12}
           title={this.props.labelName}
           data={
             this.props.skillDataSet
           }
           value=''
           onAutocomplete={value => this.setSelectedSkill(value)}
         />
         <Col s={12} className='selection'>
            <RadioGroup
                  name="skill-requirement"
                  value={this.state.selectedValue}
                  onChange={this.setCheckedInput}
                  className="formInput">
                <FormControlLabel value="preferred" control={<Radio color="primary"/>} label="Preferred" />
                <FormControlLabel value="required" control={<Radio color="primary" />}  label="Required" />
                <FormControlLabel value="featured" control={<Radio color="primary" />}  label="Featured" />
            </RadioGroup>
         </Col>
         <Col s={12} className='selection'>
            <RadioGroup
                  name="skill-level"
                  value={this.state.selectedLevel}
                  onChange={this.setSkillLevel}
                  className="formInput">
                <FormControlLabel value="0" control={<Radio color="primary"/>} label="0" />
                <FormControlLabel value="1" control={<Radio color="primary" />}  label="1" />
                <FormControlLabel value="2" control={<Radio color="primary" />}  label="2" />
                <FormControlLabel value="3" control={<Radio color="primary" />}  label="3" />
            </RadioGroup>
         </Col>
         <Col s={0}>
           <SkillChip skills={this.props.skills} />
         </Col>
        </MuiThemeProvider>
      );
    }
}
