const express= require('express')
	const app = express() 
	app.get('/home',(req,resp) => {

   resp.sendFile(__dirname+'/Images' +'/4578');
})

app.listen();
    
