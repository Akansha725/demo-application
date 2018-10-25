import React from 'react';
import { Row, Input, Col } from 'react-materialize';
import './../styles/Form.css';
import DatePickers from './DatePickers';
import Skills from './Skills';
import Background from './Background';
import CityInfo from './CityInfo';

var ApplicationForm = (props) => {
    return (
      <div>
        <Row className='row'>
          <Input s={12}
                 label="Job Title"
                 defaultValue={props.formData.title}
                 labelClassName="label"
                 maxLength="100"
                 onChange={(event, value) => props.updateForm('title', value)}/>
          <Input s={12}
                 label="Description"
                 defaultValue={props.formData.description}
                 labelClassName="label"
                 onChange={(event, value) => props.updateForm('description', value)}/>
          <Background
                background={props.backgroundDataSet}
                labelName="Background"
                deafultValue={props.formData.backgrounds}
                selectedBackground={props.selectedBackground}
                deleteBackground={props.deleteBackground}
                setSelectedBackground={props.setSelectedBackground}/>
          <Skills
                skills={props.selectedSkills}
                labelName="Skills"
                skillDataSet={props.skillDataSet}
                setSelectedSkill={props.setSelectedSkill}/>
          <Input s={12}
                 label="Selection Process"
                 defaultValue={props.formData.selection_process}
                 labelClassName="label"
                 onChange={(event, value) => props.updateForm('selection_process', value)}/>
          <Input s={12}
                 label="Salary"
                 type="number"
                 defaultValue={props.formData.salary}
                 labelClassName="label"
                 onChange={(event, value) => props.updateForm('salary', value)}/>
          <CityInfo labelName="City Info" defaultValue={props.formData.role_city} />
          <Col s={4}>
            <DatePickers
                label="Application Close Date"
                defaultValue={new Date(props.formData.applications_close_date)}
                isMaxDate={true}
                type={"applications_close_date"}
                isMinDate={true}
                handleDateChange={props.handleDateChange}/>
          </Col>
          <Col s={4}>
            <DatePickers
                label="Start Date"
                type={"earliest_start_date"}
                defaultValue={new Date(props.formData.earliest_start_date)}
                handleDateChange={props.handleDateChange}/>
          </Col>
          <Col s={4}>
            <DatePickers
                label="End Date"
                type={"latest_end_date"}
                defaultValue={new Date(props.formData.latest_end_date)}
                handleDateChange={props.handleDateChange}/>
          </Col>
        </Row>
      </div>
    );
}

export default ApplicationForm;
