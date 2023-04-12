import React, {useState} from 'react';

function Form(props) {
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
        <input type="button" value="Submit" onClick={submitForm} />
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

    /**
     * Calls the prop handleSubmit and passes the Form state as the person parameter
     * (nested function uses person defined above)
     * then resets state to inital state to clear the form after submission.
     */
    function submitForm() {
        props.handleSubmit(person);
        setPerson({name: '', job: ''});
    } 
}

export default Form;