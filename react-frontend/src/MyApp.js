import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';
import Form from './Form';

function MyApp() { 
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index){
    const updated = characters.filter((character, i) => {
      return i !== index
    });
    setCharacters(updated);
  }

  //Submit data and update the parent state
  //Update the state by taking the existing characters and adding the new person parameter
  function updateList(person) {
    setCharacters([...characters, person]);
  }

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
 }
 
 //React.useEffect()
  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] ); //Only called on first mount.

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}
//Makes the component avalible to be imported into other components or files
export default MyApp;