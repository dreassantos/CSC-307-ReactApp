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