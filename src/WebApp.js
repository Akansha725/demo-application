import React, { Component } from 'react';
import './styles/App.css';
import request from 'superagent';
import { Col, Preloader, Button } from 'react-materialize';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';

import ApplicationForm from './components/ApplicationForm';
import content from './content.json';

export default class WebApp extends Component {

  constructor(props){
    super(props);
    this.state = {
      formData: {},
      isLoading: false,
      skillSet: [],
      backgroundOption: [],
      skillDataSet: {},
      backgroundFullSet: {},
      selectedBackground: [],
      selectedSkills: [],
      canSubmit: false
    };

    this.setSelectedSkill = this.setSelectedSkill.bind(this);
    this.setSelectedBackground = this.setSelectedBackground.bind(this);
    this.deleteBackground = this.deleteBackground.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
  }

  componentDidMount(){
     //to get opputunities
      request.get(content.getOppurtunityById)
            .then((success) => {
                this.setState({
                  formData: {
                      title: success.body.title,
                      description: success.body.description,
                      applications_close_date: success.body.applications_close_date,
                      earliest_start_date: success.body.earliest_start_date,
                      latest_end_date: success.body.latest_end_date,
                      selection_process: success.body.role_info.selection_process,
                      salary: success.body.specifics_info.salary,
                      role_city: success.body.google_place_id
                  },
                  isLoading: true,
                  selectedSkills: success.body.skills,
                  selectedBackground: success.body.backgrounds
                });
            });

      //To get Skill and send to child conponent
      request.get(content.getSkills)
            .then((success) => {
                let data = {};
                (success.body).forEach(val => {
                    data[val.name] = null;
                });
                this.setState({
                   skillDataSet: data,
                   skillSet: success.body
                });
            });

      //To get backgrounds and send to child conponent
      request.get(content.getBackground)
            .then((success) => {
                let data = {};
                (success.body).forEach(val => {
                    data[val.name] = null;
                });
                this.setState({
                   backgroundFullSet: data,
                   backgroundOption: success.body
                });
            });
  }

  setSelectedSkill(value, option, level){
    let selection = this.state.selectedSkills;
    let isPresent = false;
    //To prevent duplciate items to added in list
      _.forEach(selection, function(val){
        if(val.name === value){
          isPresent = true;
        }
      });

      if(!isPresent){
        (this.state.skillSet).forEach(skillValue =>{
           if(skillValue.name === value){
             skillValue["option"] = option;
             skillValue["level"] = parseInt(level, 10);;
             selection.push(skillValue);
             this.setState({
               selectedSkills: selection
             });
           }
        });
      }
  }

  setSelectedBackground(value, option){
    let selection = this.state.selectedBackground;
    let isPresent = false;
    //To prevent duplciate items to added in list
      _.forEach(selection, function(val){
        if(val.name === value){
          isPresent = true;
        }
      });

      if(!isPresent){
        (this.state.backgroundOption).forEach(bgValue =>{
           if(bgValue.name === value){
             console.log(selection);
             console.log(selection.includes(bgValue));
             bgValue["option"] = option;
             bgValue["level"] = null;
             if(selection.length === content.maxBackground ){
               selection.pop();
               selection.push(bgValue);
             }else {
                selection.push(bgValue);
             }
             this.setState({
               selectedBackground: selection
             });
           }
        });
      }
  }

  deleteBackground(value){
    this.setState(state => {
      const selectedBackground = [...state.selectedBackground];
      const dataToDelete = selectedBackground.indexOf(value);
      selectedBackground.splice(dataToDelete, 1);
      return { selectedBackground };
    });
  }

  updateForm(name, value){
    let formData = Object.assign({}, this.state.formData);
    formData[name] = value;
    this.setState({formData});
  }

  handleDateChange(type, value){
    let formData = Object.assign({}, this.state.formData);
    formData[type] = (new Date(value)).toISOString();
    this.setState({formData});
  }

  submitData(){
    let state = this.state;

    this.setState({
      isLoading: false
    });

    let updatedData = {
      "opportunity": {
        "title":state.formData.title,
        "description":state.formData.description,
        "earliest_start_date": state.formData.earliest_start_date,
        "latest_end_date": state.formData.latest_end_date,
        "applications_close_date":  state.formData.applications_close_date,
        "skills": state.selectedSkills,
        "backgrounds": state.selectedBackground,
        "role_info":{
          "selection_process": state.formData.selection_process,
          "city": "Chennai"
        },
        "specifics_info":{
          "salary": state.formData.salary
        }
      }
    }
    request.patch(content.getOppurtunityById)
           .send(updatedData)
           .then(success => {
              if(success.status === 200){
                this.setState({
                  isLoading: true
                });
                toast("Changes Updated Successfully!", {
                  position: toast.POSITION.TOP_CENTER
                });
              }
           })
           .catch(error => {
              console.log(error);
              this.setState({
                isLoading: true
              });
              toast.error("Facing issue while updating the form", {
                position: toast.POSITION.TOP_CENTER
              });
           });
  }

  canSubmit(){
    return (!_.isEmpty(this.state.formData.title) && !_.isEmpty(this.state.formData.description) && !_.isEmpty(this.state.formData.applications_close_date)
              && !_.isEmpty(this.state.formData.earliest_start_date) && !_.isEmpty(this.state.formData.latest_end_date)
              && !_.isEmpty(this.state.formData.salary) && !_.isEmpty(this.state.formData.role_city) && !_.isEmpty(this.state.selectedSkills)
              && !_.isEmpty(this.state.selectedBackground) && !_.isEmpty(this.state.formData.selection_process));
  }


  render() {
    return (
      <div className="App">
        {  this.state.isLoading &&
          <div>
              <ApplicationForm
                  formData={this.state.formData}
                  skillDataSet={this.state.skillDataSet}
                  backgroundDataSet={this.state.backgroundFullSet}
                  setSelectedSkill={this.setSelectedSkill}
                  deleteBackground={this.deleteBackground}
                  setSelectedBackground={this.setSelectedBackground}
                  selectedSkills={this.state.selectedSkills}
                  selectedBackground={this.state.selectedBackground}
                  updateForm={this.updateForm}
                  handleDateChange={this.handleDateChange}/>
              <Button waves='light' onClick={this.submitData} disabled={!this.canSubmit()}>Submit</Button>
          </div>
        }
        {  !this.state.isLoading &&
          <Col s={4}>
            <Preloader size='small' className='preLoader'/>
          </Col>
        }
        <ToastContainer />
      </div>
    );
  }
}
