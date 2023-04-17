import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './Table';
import Form from './Form';

function MyApp() { 
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index){
    const curId = characters[index].id;
    makeDeleteByIdCall(curId).then( result => {
      if(result != undefined && result.status === 204){
        const updated = characters.filter((character, i) => {
          //changing to remove duplicate ids from table. 
          return character.id != curId;
        });
        setCharacters(updated);
      }
    });
  }

  //post call happens first (sends JSON object, person to backend)
  //Then check status and update info in table. 
  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result != undefined && result.status === 201)
       setCharacters([...characters, result.data] );
       //console.log(result);
    });
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

 //axios.post(url, data) -> sends person (JSON object) to the backend.
 //errors if backend sends error status code. 
 async function makePostCall(person){
  try {
     const response = await axios.post('http://localhost:8000/users', person);
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}

async function makeDeleteByIdCall(id){
  try {
    //console.log('http://localhost:8000/users/'+id);
     const response = await axios.delete(`http://localhost:8000/users/${id}`); 
     return response;  
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