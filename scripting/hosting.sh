echo "host your webpage easily "
echo "file creation : SUCCESSFULL"
echo "server status: RUNNING "
echo "server started on port no : $3 "
echo "route name is : $1 "
echo "url like http://ip:$3/$1"
echo "const express= require('express')
	const app = express() 
	app.get('/$1',(req,resp) => {

   resp.sendFile(__dirname+'/Images' +'/$2');
})

app.listen($3);
    " > /root/shinchan/$4.js
    cd /root/shinchan

    $(node $4)
echo "server started ....."
