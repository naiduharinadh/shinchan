const express= require('express')
	const app = express() 
	app.get('/hoster2',(req,resp) => {

   resp.sendFile(__dirname+'/Images' +'/1687760040313body.html');
})

app.listen(5454);
    
