import React from 'react';
import { Autocomplete } from 'react-materialize';
import './../styles/Form.css';
import request from 'superagent';

export default class CityInfo extends React.Component {
    constructor(props){
      super(props);
      this.state= {
        city: '',
        cityDataSet: {},
        cityFullDataSet: {},
       }
       this.setSelectedCity = this.setSelectedCity.bind(this);
       this.getUpdatedCity = this.getUpdatedCity.bind(this);
    }

    componentDidMount(){
        request.get('http://47.74.238.48:3005/getPlace/?palceId='+this.props.defaultValue)
                .then(result => {
                  this.setState({
                    city: result.body.result.name
                  });
                });
    }

    setSelectedCity(value){
      (this.state.cityFullDataSet).forEach(val => {
        if(val.description === value){
          this.props.setSelectedCity(val.place_id);
        }
      });
    }

    getUpdatedCity(value){
      this.setState({
        city: value
      });
      request.get('http://47.74.238.48:3005/updatePlace/?placeName='+value)
              .then(res => {
                let data = {};
                (res.body.predictions).forEach(val => {
                    data[val.description] = null;
                });
                this.setState({
                  cityFullDataSet: res.body.predictions,
                  cityDataSet: data
                });
              });
    }

    render(){
       return (
          <Autocomplete
           s={12}
           title={this.props.labelName}
           data={
             this.state.cityDataSet
           }
           value={this.state.city}
           onAutocomplete={value => this.setSelectedCity(value)}
           onChange={(event, value) => this.getUpdatedCity(value)}
         />
      );
    }
}
