//Express module
const express = require('express'); 	

//Cors module
const cors = require('cors');

//an instance of the express module
const app = express(); 	


//The port we will listen to incoming http requests. 
const port = 8000; 							

//tell app to use cors module to enable cors requests
//This will allow our backend to respond to calls coming from a different origin.
app.use(cors());

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
	//updated response code with user that has an id. 
	res.status(201).send(addUser(userToAdd));
});

function addUser(user){
	//generate an id for the new user
	const newid = ""+generateNewId();
	//const newUser = {...user, id: id}; //updates the id property.
	const newUser = {id: newid, name: user.name, job: user.job}; //updates the id property.  
	users['users_list'].push(newUser);
	return newUser;
}

const generateNewId = () => {
	return Math.floor(Math.random() * 500001);
}


//Use app.delete to remove a particular user with the matching id from the list. 
//Will delete all users with the same id!!!
app.delete('/users/:id', (req, res) => {
	const idToDel = req.params.id;
	let result = findUserById(idToDel);
	if (result === undefined || result.length == 0)
		//syntax to return a specific http status code with message.
		//cant delete user. none found.
		 res.status(404).send('Resource not found.');
	else {
		//http status code for a successful delete 204
		 deleteUserById(idToDel);
		 res.status(204).send('deleted');
	}
});

function deleteUserById(id) {
	//JS Array method findindex to get the index of the user with the id.
	let userWithIdIndex = users.users_list.findIndex((user) => user.id === id);
	//remove it from the arr of users if it is there.
	do {
		if(userWithIdIndex > -1){
			users.users_list.splice(userWithIdIndex, 1);
		}
	} while ((userWithIdIndex = users.users_list.findIndex((user) => user.id === id)) != -1);
}

//JSON Object of users
const users = { 
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
      },
   ]
}