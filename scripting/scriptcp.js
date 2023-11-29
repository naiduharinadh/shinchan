const express= reqire('express')
	const app = express() 
	app.listen('/',(req,resp) => {

   resp.send(__dirname+'/');
})
    
