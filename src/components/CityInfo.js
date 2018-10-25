import React from 'react';
import { Autocomplete } from 'react-materialize';
import './../styles/Form.css';
import request from 'superagent';
import * as content from './../content.json';

export default class CityInfo extends React.Component {
    constructor(props){
      super(props);
      this.state= {
        city: '',
        cityDataSet: {}
       }
       this.setSelectedCity = this.setSelectedCity.bind(this);
    }

    componentDidMount(){
        request.get('http://localhost:3005/getPlace/?palceId='+this.props.defaultValue)
                .then(result => {
                  console.log(result);
                });
    }

    setSelectedCity(value){
      console.log(value);
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
         />
      );
    }
}
