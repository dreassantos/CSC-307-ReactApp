import React, {useState} from 'react';
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

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}
//Makes the component avalible to be imported into other components or files
export default MyApp;