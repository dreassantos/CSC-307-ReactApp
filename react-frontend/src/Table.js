import React from "react";
//Create a table using HTML and use it as a new react component called Table.

function TableHeader(){
  return(
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>         
        <td>{row.job}</td>
      </tr>
    );
   }
  );
  return (
    <tbody>
      {rows}
    </tbody>
   );
}


function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody characterData={props.characterData} />
    </table>
  );
}

//make the component avalible to other components or files
export default Table;