import React, {useState} from 'react';

function Form() {
  const [person, setPerson] = useState(
    {
        name: "",
        job: "",
    }
  );


  return (
    <form>
        <label htmlFor="name">Name</label>
        <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange} />
        <label htmlFor="job">Job</label>
        <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange} />
    </form>
    );

    /**
     * A function that will run every time a change is made to an input.
     * @param {} event triggered the handler
     */
    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "job") //TODO: Ask Why does this use 3 ===
          setPerson(
             {name: person['name'], job: value}
          );
        else     
           setPerson(
             {name: value, job: person['job']}   
           );
    }
}


export default Form;