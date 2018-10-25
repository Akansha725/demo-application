import React from 'react';
import ReactDOM from 'react-dom';
import Skills from './../components/Skills';

it('Checking of Skills component', () => {
  const div = document.createElement('div');
  <Skills
        skills={props.selectedSkills}
        labelName="Skills"
        skillDataSet={props.skillDataSet}
        setSelectedSkill={props.setSelectedSkill}/>
  ReactDOM.render(<Skills />, div);
});
