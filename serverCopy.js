const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require('dotenv').config();
const {exec} = require('child_process');

mongoose.set('strictQuery', true);

const app=express()
app.use(express.urlencoded({extended: true}));
const ip = "192.168.126.128";
//const ip=process.env.x;
//console.log(process.env.USER);
console.log(ip);
const hostfilename="1675358498826basic2.html.html";

//creating view-engine and creating router to get the files from the client 
app.set("view engine" , "ejs");
const storage = multer.diskStorage({

	            destination:(req,file,cb) => {
		           cb(null,"Images")
	                      },


	           filename: (req,file,cb ) => {    
			                console.log(file)  ;
	                                cb(null , Date.now() + file.originalname ) ;
					}
                                })
	


const upload = multer( { storage: storage } );


app.get("/uploadfile", (req,resp) => {
	       console.log("file rendered successfully ")

		resp.render("uploadfile" , {msg:ip , alerter:"file uploaded successfully"});
} );
/*
app.post("/uploadfile" ,upload.single("image"), (req,resp) => {

	var filename = req.body.filename;
	console.log(filename);
	console.log("uploaded successfully ....")
         resp.send("uploaded succes fully and go back to the work again ")
})

*/

 //database connection class creation 
//mongoose.connect("mongodb://127.0.0.1:27017/userdata");
mongoose.connect("mongodb+srv://harinadh14:N%40dh2306@atlascluster.9fb52n9.mongodb.net/userdata");
app.use(express.urlencoded({extended:"true"}));
const userschema = mongoose.Schema({
	name:String,
	userid:String,
	phone:Number,
	emailid:String,
	password:String,
});

const user= mongoose.model("user" , userschema);








// Define schema for file documents
const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  mimeType: String,
  url: String,
});

//this constant is already declared above 
//const upload = multer({ storage });

const File = mongoose.model('File', fileSchema);

// Define API endpoint for file uploads
app.post('/uploadfile', upload.single('image'), async (req, res) => {
  const { filename, originalname, mimetype } = req.file;

  // Create a new file document in MongoDB
  const newFile = new File({
    filename,
    originalName: originalname,
    mimeType: mimetype,
    url: req.file.path,
  });

  await newFile.save();

	res.status(200).json({ message: 'File uploaded successfully' });

});



//fill the data and send data-form to server
app.get("/home" , (req,resp ) =>{
resp.render("form" , { msg: ip });
} )

app.post("/signup" , async(req,resp) =>{  
          
	const u = user( {
			  name:req.body.name,
                          userid: req.body.userid,
	                  phone:req.body.phone,
	                  emailid:req.body.emailid,
	                  password:req.body.password,
		  })
	const User= await user.findOne({userid:req.body.userid});
	const Userid= await user.findOne({emailid:req.body.emailid});
	if(User)
	{
		console.log(User);
		//try to render same page than goes to the another  page which should detect the repeated value of the mail 
		resp.render("form",{msg:"userid OR email  already exsted"})}


	else if (Userid){
            resp.send("form", {msg: "userid OR email already existed"});
	}
	

       else{
	u.save();
	       console.log("user id from the U.userid: ",u.userid);
	       console.log("user emailid:  " , u.emailid);
//	exec("wpbasefile.sh" + " "+u.userid + "  "+u.emailid+"  " +u.password+"  "+u.name, (err, stdout, stderr)=>{

//		resp.render("login" , {msg:ip});
//	});
	       exec ("wpbasefile.sh" + " "+u.userid + "  "+u.emailid+"  " +u.password+"  "+u.name, (err, stdout, stderr)=>{})
	       
	


//	       console.log("console username is : ",u.userid);

	resp.render("login"  , {msg:ip }); 
        }
	//resp.sendFile(__dirname + "/loginpage.html")
//	resp.send(__dirname + "/loginpage.html");
})

app.post("/preacc" , (req,resp)=>{
resp.render("login" , {msg:ip})
})

//enough for the login to our page 

app.post("/login", async (req, res) => {
    const fuser = await user.findOne({ emailid: req.body.lemail, password: req.body.lpassword  });
//	console.log(fuser);
	if (fuser === null) { res.render("login", {msg:"please provide correct credentials"})}
	else{
		const userdata= await user.findOne({emailid:req.body.lemail})
       	     //	console.log(userdata);
	    //	console.log(userdata.name);
	

		exec("adduser.sh"+ "  " + userdata.password+"  "+userdata.userid , (err, stdout, stderr) => {
		//	console.log(userdata.userid);
		//	console.log(userdata.password);
				  res.render("lognext" ,
					  { 
					      name: userdata.name,
                                             userid: userdata.userid,
                                             phone: userdata.phone,
                                             mailid: userdata.emailid,
                                           })
     })

		/*
              	res.render("lognext" , {  name: userdata.name,
					  userid: userdata.userid,
					  phone: userdata.phone,
					  mailid: userdata.emailid,
					})  */
	    }
     });




//get only one data from the client is enough and 
//use the entire data into the linux terminal to make the user data valuable 
//create the accounts based on the user data use SCRIPT 



app.post("/pushimage" , (req,resp)=> {
	const osname= req.body.osname;
	const cmtname= req.body.cmtname;
	const tagname=req.body.tagname;
	const userid= req.body.userid;
	const dckpassword= req.body.dckpassword;
     exec("imgcreate.sh "+" "+ osname + "  "+ cmtname + " "+tagname +" "+ userid +" "+ dckpassword , (err, stdout, stderr) => {
  resp.send( "<pre>"+stdout+"</pre>");
     })

})
app.get( "/pushimage",  (req,resp) => {

  resp.render("pushimage" ,{msg:"this is push image "})

} )









//hosting routr for the client purpose only 
app.get("/hosting" , (req,resp) => {
        const portno= req.query.portno;
	const hostname = req.query.hostname;
	const filename = req.query.filename;
	const serverfile = req.query.serverfile;
	exec(("hosting.sh" + " " + hostname + " " + filename + " " + portno + " " + serverfile , "runsrv.sh" + " " + serverfile ),( err,stdout, stderr ) => {
	
//		resp.send (  stdout );
	} )
 resp.send(  "your file url is: " + "<h3 style='color:white; border:2px solid white ; border-radious:50%; width:360px ;background-color: black ;text-align:center;text-opacity:30%'>" +
	 ip +":" + portno +"/" + hostname + "</h3>" +"<br />"+"<br />" +"if you are not getting the page data then copy this command -> go back  -> paste it in the linux-terminal -> enter to start the server -> and refresh your page-url " +"<br />"+"<h3 style='color:white; text-opacity:20%; border:2px solid white ; border-radious:50%; width:75% ;background-color: black ;text-align:center;text-opacity:30%'>"+ "hosting.sh" + " " + hostname + " " + filename + " " + portno + " " + serverfile +"</h3>"+"<br />" );

//resp.render( "hoster.ejs",{msg: "copy your url is " + ip +":" + portno+"/"+hostname+ "       " + "serverfile name is : file" + serverfile } )
  resp.send("runsrv.sh" +"  "+serverfile+".js");
})



//server codes  latest started form here
app.get("/terminal" ,(req,resp) => {
      resp.render("terminal" , {msg :ip });


})


app.get("/ps" , (req,resp) => {

exec("docker ps -a " , (err, stdout, stderr) => {    
  resp.send("<pre>"+stdout+"</pre>");
	

});
})



app.get("/imgid" , (req,resp) =>{  
   const cntname= req.query.cname;
	const bosname= req.query.osname;
	const networkname= req.query.network;
	const memory = req.query.memory;
	const envs= req.query.envs;
	//console.log(envs);
	exec( " docker run -dit --name " + cntname+" " +"--network"+ " "+ networkname+" "+ "--memory"+" "+ memory+"MB" + "  "+envs +"  " +bosname , (err, stdout, stderr) => {
               resp.send("your container id is : " + stdout);
  })


})





app.get("/networkcreate", (req,resp)=> {
        const networkname= req.query.networkname;
	const subnetvalue= req.query.subnetvalue;
	const nettype= req.query.nettype;
	console.log(networkname);
	console.log(subnetvalue);
	console.log(nettype);
	exec("docker" + "  "+"network"+ "  "+ "create"+"  "+networkname+" "+"-d"+"  "+nettype+" "+"--subnet="+subnetvalue , (err, stdout, stderr)=> {resp.send("your network id is:"+ stdout )})

//	exec("docker network create network3 -d bridge --subnet=3.4.0.0/16" , (err, stdout, stderr)=> {resp.send("your network id is:"+ stdout )})
})

app.post("/getnetworkdetils" , (req,resp) => {

const networkname=req.body.networkname;
const subnetvalue=req.body.subnetvalue;
        resp.render("docker",{msg: ip });
})






app.post("/hostme", (req,resp) => {  
	 const serverfile = req.body.serverfile;
	console.log(serverfile);
     exec("runsrv.sh"+ " " + serverfile +".js" , (err,stdout,stderr) => {

    resp.send( "server started" );
     })
//	resp.send("server started ....'); 

} )





app.post("/cntimage" , (req,resp) => {

const cntname=req.query.cname;
const bosname=req.query.osname;
	resp.render("docker",{msg: ip });
})




app.get("/showfiles" , (req,resp) => {
exec("bash" +"  "+"displayfiles.sh" , (err,stdout, stderr) => {
	resp.send("<pre>" + stdout + "</pre>")

})

})

app.listen(2346, (resp) => {console.log("server started in 2346")})
