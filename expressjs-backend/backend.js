//Express module
const express = require('express'); 	

//an instance of the express module
const app = express(); 						

//The port we will listen to incoming http requests. 
const port = 8000; 							

//tell express module to process all incoming data in JSON format
app.use(express.json()); 						

/*
	set up api endpoint to accept http get requests. 
	get(pram1, pram2)
	pram1- request: URL pattern to this endpoint
	pram2- response: Callback function that is called when our server recieves an incoming GET request matching the URL in pram1.
*/
app.get('/', (req, res) =>{   
	res.send('Hello World!'); //use response object to send a msg back.
});


//Make our backend server listen to incoming http requests on the defined port number. 
app.listen(port, () => { 
	console.log(`Example app listening at http://localhost:${port}`); 
});

//Use get to define a rout called '/users' which will return the entire list of users 
//or if a name is given, returns items in the list with matching the name. 
app.get('/users', (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	if(job != undefined && name != undefined){
		let result = findUserbyNameAndJob(name, job);
		result = {users_list: result};
		res.send(result);
	}
	else if (name != undefined){
		 let result = findUserByName(name);
		 result = {users_list: result};
		 res.send(result);
	}
	else{
		 res.send(users);
	}
});

const findUserbyNameAndJob = (name, job) => {
	return users['users_list'].filter( (user) => user['name'] === name & user['job'] === job); 
}

const findUserByName = (name) => { 
	return users['users_list'].filter( (user) => user['name'] === name); 
}

//Use get to define a rout called '/users:id' which will return any users that match the id
//Extending so that it can get users by name and job.
app.get('/users/:id', (req, res) => {
	const id = req.params['id']; //or req.params.id
	let result = findUserById(id);
	if (result === undefined || result.length == 0)
		//syntax to return a specific http status code with message.
		 res.status(404).send('Resource not found.');
	else {
		 result = {users_list: result};
		 res.send(result);
	}
});

function findUserById(id) {
	//JS array find() can be used to filter
	return users['users_list'].find( (user) => user['id'] === id); 
	//Or this way works too...
	//return users['users_list'].filter( (user) => user['id'] === id);
}

//Use app.post to take data that comes in and add it to the list. 
//Assum we are getting perfect data since we didnt validate it.
app.post('/users', (req, res) => {
	const userToAdd = req.body;
	addUser(userToAdd);
	//default response code 
	res.status(200).end();
});

function addUser(user){
	users['users_list'].push(user);
}


//Use app.delete to remove a particular user with the matching id from the list. 
app.delete('/users/:id', (req, res) => {
	const id = req.params.id;
	let result = findUserById(id);
	if (result === undefined || result.length == 0)
		//syntax to return a specific http status code with message.
		//cant delete user. none found.
		 res.status(404).send('Resource not found.');
	else {
		//http status code for a successful delete 204
		 deleteUserById(id);
		 res.status(204).send('deleted');
	}
});

function deleteUserById(id) {
	users = users.users_list.filter((user)=> user.id !== id);
	/*
	//TODO: This only deletes one user. Changed users to let.
	//JS Array method findindex to get the index of the user with the id.
	const userWithIdIndex = users.users_list.findIndex((user) => user.id === id);
	//remove it from the arr of users if it is there.
	if(userWithIdIndex > -1){
		users.users_list.splice(userWithIdIndex, 1);
	}
	*/
}

//JSON Object of users
let users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}