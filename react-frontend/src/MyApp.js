import React from 'react'
import Table from './Table';

const characters = [
  {
    name: 'charlie',
    job: 'Janitor',
  },
  {
    name: 'Mac',
    job: 'Bouncer',
  },
  {
    name: 'Dee',
    job: 'Aspiring actress',
  },
  {
    name: 'Dennis',
    job: 'Bartender',
  },
];

function MyApp() { 
  return ( 
    //ClassName property of the div element is pointing to a style from the css file)
    <div className='container'> 
      <Table characterData = {characters} />
    </div> 
  );  
}   
//Makes the component avalible to be imported into other components or files
export default MyApp;