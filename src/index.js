const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {loginmodel,savemodel} = require("./config");
const multer =require("multer");
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port=process.env.PORT || 3000 ;

   
const app = express();
                    
const secretKey =  process.env.SECRET_KEY || 'telinso';
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
      
app.use(express.static("public"));
app.use(express.static("uploads"));

const verifyToken = async(req,res)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message:'Unauthorized'});

 
    try{
        const decoded = await jwt.verify(token,secretKey);
        req.user = decoded;
    }
    catch(err){
        return res.status(401).json({message:'Unauthorized'});
    }
};
const extractToken = (req,res)=>{
    const token = req.headers['authorization'];
    if(token){
        req.token= token.split(' ')[1];
    }
    
};

const storage=multer.diskStorage ({
        destination:function(req,file,cb)
        {cb(null, './uploads'); 
    },
    filename:function(req,file,cb){
        cb(null,`${file.originalname}`);
    },
    });

const upload = multer({ storage:storage });



   

app.get("/",(req,res)=>{

    if (req.cookies.token) {
                
        res.render("welcome");
    } else {
    
        const message = ""; 
    res.render("login", { message: message });
    }

 
})
app.get("/login",(req,res)=>{

    const message = ""; 
    res.render("login", { message: message });
})
app.get("/signup",(req,res)=>{
    res.render("signup"); 
})
app.get("/logout", (req, res) => {
    const message = ""; 
    res.clearCookie('token'); 
    res.render("login", { message: message });
    
    
});
app.get("/welcome",extractToken,verifyToken, async(req,res)=>{

    const farmerdata = await farmermodel.find().sort({_id:-1}).limit().exec();
    res.render("welcome",{farmerdata:farmerdata});
  
})  
app.get("/weather",(req,res)=>{

    if(req.cookies.token){

        res.render("weather");

    }else{

        res.render("index");
    }
})

app.get("/savedata",async(req,res)=>{
    
    if(req.cookies.token){

        res.render("savedata");

    }else{

        res.render("index");
    }
   
    
})
app.get("/admin",(req,res)=>{
    res.render("admin");
})

app.get("/booth138",async(req,res)=>{
    
    res.render("booth138");
})
app.get("/booth139",async(req,res)=>{
    
    res.render("booth139");
})
app.get("/booth140",async(req,res)=>{
    
    res.render("booth140");
})
app.get("/squadlist",async(req,res)=>{
    
    res.render("squadlist");
})
app.get("/voterlist",async(req,res)=>{
    
    const soildatas = await savemodel.find({boothno:138}).sort({ serialno: 1 }).exec();

    const count5 = await savemodel.find({boothno:138}).countDocuments({postalvote: "yes"});
    const count4 = await savemodel.find({boothno:138}).countDocuments({openvote: "yes"});
    const count3 = await savemodel.find({boothno:138}).countDocuments({availability: "no"});
    const count2 = await savemodel.find({boothno:138}).countDocuments({votestatus: "notvoted"});
    const count1 = await savemodel.find({boothno:138}).countDocuments({votestatus: "voted"});
    const count = await savemodel.find({boothno:138}).countDocuments();
    res.render("voterlist",{soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
}) 
app.get("/voterlist2",async(req,res)=>{
    
    const soildatas = await savemodel.find({boothno:139}).sort({ serialno: 1 }).exec();

    const count5 = await savemodel.find({boothno:139}).countDocuments({postalvote: "yes"});
    const count4 = await savemodel.find({boothno:139}).countDocuments({openvote: "yes"});
    const count3 = await savemodel.find({boothno:139}).countDocuments({availability: "no"});
    const count2 = await savemodel.find({boothno:139}).countDocuments({votestatus: "notvoted"});
    const count1 = await savemodel.find({boothno:139}).countDocuments({votestatus: "voted"});
    const count = await savemodel.find({boothno:139}).countDocuments();
    res.render("voterlist2",{soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
}) 
app.get("/voterlist3",async(req,res)=>{
    
    const soildatas = await savemodel.find({boothno:140}).sort({ serialno: 1 }).exec();

    const count5 = await savemodel.find({boothno:140}).countDocuments({postalvote: "yes"});
    const count4 = await savemodel.find({boothno:140}).countDocuments({openvote: "yes"});
    const count3 = await savemodel.find({boothno:140}).countDocuments({availability: "no"});
    const count2 = await savemodel.find({boothno:140}).countDocuments({votestatus: "notvoted"});
    const count1 = await savemodel.find({boothno:140}).countDocuments({votestatus: "voted"});
    const count = await savemodel.find({boothno:140}).countDocuments();
    res.render("voterlist3",{soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
}) 
app.get("/138squad1",async(req,res)=>{
    
    const soildatas = await savemodel.find({boothno:138,squadno:1}).sort({ serialno: 1 }).exec();

    const count5 = await savemodel.find({boothno:138,squadno:1}).countDocuments({postalvote: "yes"});
    const count4 = await savemodel.find({boothno:138,squadno:1}).countDocuments({openvote: "yes"});
    const count3 = await savemodel.find({boothno:138,squadno:1}).countDocuments({availability: "no"});
    const count2 = await savemodel.find({boothno:138,squadno:1}).countDocuments({votestatus: "notvoted"});
    const count1 = await savemodel.find({boothno:138,squadno:1}).countDocuments({votestatus: "voted"});
    const count = await savemodel.find({boothno:138,squadno:1}).countDocuments();
    res.render("138squad1",{soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
}) 
app.get("/138squad2",async(req,res)=>{
    
    const soildatas = await savemodel.find({boothno:138,squadno:2}).sort({ serialno: 1 }).exec();

    const count5 = await savemodel.find({boothno:138,squadno:2}).countDocuments({postalvote: "yes"});
    const count4 = await savemodel.find({boothno:138,squadno:2}).countDocuments({openvote: "yes"});
    const count3 = await savemodel.find({boothno:138,squadno:2}).countDocuments({availability: "no"});
    const count2 = await savemodel.find({boothno:138,squadno:2}).countDocuments({votestatus: "notvoted"});
    const count1 = await savemodel.find({boothno:138,squadno:2}).countDocuments({votestatus: "voted"});
    const count = await savemodel.find({boothno:138,squadno:2}).countDocuments();
    res.render("138squad2",{soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
})
app.get("/138squad3",async(req,res)=>{
    
    const soildatas = await savemodel.find({boothno:138,squadno:3}).sort({ serialno: 1 }).exec();

    const count5 = await savemodel.find({boothno:138,squadno:3}).countDocuments({postalvote: "yes"});
    const count4 = await savemodel.find({boothno:138,squadno:3}).countDocuments({openvote: "yes"});
    const count3 = await savemodel.find({boothno:138,squadno:3}).countDocuments({availability: "no"});
    const count2 = await savemodel.find({boothno:138,squadno:3}).countDocuments({votestatus: "notvoted"});
    const count1 = await savemodel.find({boothno:138,squadno:3}).countDocuments({votestatus: "voted"});
    const count = await savemodel.find({boothno:138,squadno:3}).countDocuments();
    res.render("138squad3",{soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
})
app.get("/138squad4",async(req,res)=>{
    
    const soildatas = await savemodel.find({boothno:138,squadno:4}).sort({ serialno: 1 }).exec();

    const count5 = await savemodel.find({boothno:138,squadno:4}).countDocuments({postalvote: "yes"});
    const count4 = await savemodel.find({boothno:138,squadno:4}).countDocuments({openvote: "yes"});
    const count3 = await savemodel.find({boothno:138,squadno:4}).countDocuments({availability: "no"});
    const count2 = await savemodel.find({boothno:138,squadno:4}).countDocuments({votestatus: "notvoted"});
    const count1 = await savemodel.find({boothno:138,squadno:4}).countDocuments({votestatus: "voted"});
    const count = await savemodel.find({boothno:138,squadno:4}).countDocuments();
    res.render("138squad4",{soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
})
app.get("/138squad5",async(req,res)=>{
    
    const soildatas = await savemodel.find({boothno:138,squadno:5}).sort({ serialno: 1 }).exec();

    const count5 = await savemodel.find({boothno:138,squadno:5}).countDocuments({postalvote: "yes"});
    const count4 = await savemodel.find({boothno:138,squadno:5}).countDocuments({openvote: "yes"});
    const count3 = await savemodel.find({boothno:138,squadno:5}).countDocuments({availability: "no"});
    const count2 = await savemodel.find({boothno:138,squadno:5}).countDocuments({votestatus: "notvoted"});
    const count1 = await savemodel.find({boothno:138,squadno:5}).countDocuments({votestatus: "voted"});
    const count = await savemodel.find({boothno:138,squadno:5}).countDocuments();
    res.render("138squad5",{soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
})
app.get("/soilhealth",async(req,res)=>{
    
    const soildatas = await savemodel.find().sort({ serialno: -1 }).exec();
    const count5 = await savemodel.find().countDocuments({postalvote: "yes"});
    const count4 = await savemodel.find().countDocuments({openvote: "yes"});
    const count3 = await savemodel.find().countDocuments({availability: "no"});
    const count2 = await savemodel.find().countDocuments({votestatus: "notvoted"});
    const count1 = await savemodel.find().countDocuments({votestatus: "voted"});
    const count = await savemodel.find().countDocuments();
   
    if(req.cookies.token){
  
        const count = await savemodel.countDocuments();
        res.render("soilhealth", {soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
    }else{

        res.render("index");
    }
    
})  
app.get("/selection",async(req,res)=>{

    if(req.cookies.token){

        res.render("selection");
    }else{

        res.render("index");
    }

    
})
app.get("/delete",async(req,res)=>{

    //const deldata = await savemodel.findOne().sort({_id:-1}).exec();
    //const soilname = deldata.soilname;
    
    if(req.cookies.token){

        res.render("delete");
    }else{

        res.render("index");
    }
    
})


app.get("/alert",async(req,res)=>{

    const soildatas = await savemodel.find().sort({_id:1}).exec();
    if(req.cookies.token){

        res.render("alert", {soildatas: soildatas});

    }else{

        res.render("index");
    }
     
})
app.get("/alert/:id",async(req,res)=>{

    let id=req.params.id;
    const alertdata = await savemodel.findById(id);
    const votername= alertdata.votername;
    const serialno = alertdata.serialno;
    const message = "Press the delete button";
    if(req.cookies.token){

        res.render("alert",
        {
          votername:votername,
          serialno:serialno,
          id:id,
          message:message
      });  
        
    }else{

        res.render("index");
    }
   
    
})

  
app.get("/alert/delete/:id",async(req,res)=>{


    let id=req.params.id;
    const alertdata = await savemodel.findById(id);
    const votername= alertdata.votername;
    const serialno = alertdata.serialno;
    await savemodel.findByIdAndDelete(id)

    const soildatas = await savemodel.find().sort({_id:-1}).exec();
    if(req.cookies.token){
  
        const message = "Successfully deleted press this message to go back";
        res.render("alert",
        {
            votername:votername,
            serialno:serialno,
            id:id,
            message:message

        });
        
    }else{
 
        res.render("index");
    }
     
})



app.get("/voteredit1/:id",async(req,res)=>{
    
    let id=req.params.id;
 
     const voterdata = await savemodel.findById(id);
     const serialno= voterdata.serialno;
     const votername= voterdata.votername;
     const houseno= voterdata.housename;
     const housename=voterdata.housename;
     const idno=voterdata.idno;
     const boothno=voterdata.boothno;
     

    if(req.cookies.token){
  
         
       res.render("voteredit",
       {
        id:id,
        serialno:serialno,
        votername:votername,
        houseno:houseno,
        housename:housename,
        idno:idno,
        boothno:boothno,
       
    });
        
    }else{

        res.render("index");
    }
    
      
     

}) 
   

app.post("/voteredit1/update/:id/:serialnumber/:votername/:houseno/:housename/:idno/:availability/:postalvote/:openvote/:boothno/:squadno",async(req,res)=>{

                      
    if(req.cookies.token){

        let id=req.params.id;
        let serialno= req.params.serialnumber;
        let votername= req.params.votername;
        let houseno= req.params.housename;
        let housename=req.params.housename;
        let idno=req.params.idno;
        let boothno=req.params.boothno;
        let availability=req.params.availability;
        let openvote=req.params.openvote;
        let postalvote=req.params.postalvote;
        let squadno=req.params.squadno;

        
      
         
   
        await savemodel.findById(id).updateMany({
            serialno:serialno,
            votername:votername,
            houseno:houseno,
            housename:housename,
            idno:idno,
            boothno:boothno,
            squadno:squadno,
            availability:availability,
            openvote:openvote,
            postalvote:postalvote,
            
        });
        
 
        const soildatas = await savemodel.find({boothno:138}).sort({ serialno: 1 }).exec();
        const count5 = await savemodel.find({boothno:138}).countDocuments({postalvote: "yes"});
         const count4 = await savemodel.find({boothno:138}).countDocuments({openvote: "yes"});
        const count3 = await savemodel.find({boothno:138}).countDocuments({availability: "no"});
        const count2 = await savemodel.find({boothno:138}).countDocuments({votestatus: "notvoted"});
        const count1 = await savemodel.find({boothno:138}).countDocuments({votestatus: "voted"});
        const count = await savemodel.find({boothno:138}).countDocuments();
        res.render("voterlist",{soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
        
    }else{

        res.render("index");
    }
  
   
})
app.get("/archive/:id",async(req,res)=>{
    
    let id=req.params.id;
    
    const soildatas = await savemodel.findById(id).updateOne({votestatus: "voted"});
    

    if(req.cookies.token){

        const soildatas = await savemodel.find({boothno:138}).sort({ serialno: 1 }).exec();

        const count5 = await savemodel.find({boothno:138}).countDocuments({postalvote: "yes"});
        const count4 = await savemodel.find({boothno:138}).countDocuments({openvote: "yes"});
       const count3 = await savemodel.find({boothno:138}).countDocuments({availability: "no"});
        const count2 = await savemodel.find({boothno:138}).countDocuments({votestatus: "notvoted"});
        const count1 = await savemodel.find({boothno:138}).countDocuments({votestatus: "voted"});
        const count = await savemodel.find({boothno:138}).countDocuments();
        res.render("soilhealth",{soildatas:soildatas,count:count,count1:count1,count2:count2,count3:count3,count4:count4,count5:count5});
        
    }else{

        res.render("index");
    }

})
app.get("/archive1/:id",async(req,res)=>{
    
    let id=req.params.id;
    
    const soildatas = await savemodel.findById(id).updateOne({votestatus: "voted"});
     

    if(req.cookies.token){

        
        res.render("booth138");
        
    }else{

        res.render("index");
    }

})
app.get("/archive2/:id",async(req,res)=>{
    
    let id=req.params.id;
    
    const soildatas = await savemodel.findById(id).updateOne({votestatus: "voted"});
    

    if(req.cookies.token){

        const soildatas = await savemodel.find({boothno:139}).sort({ serialno: 1 }).exec();

        const count2 = await savemodel.find({boothno:139}).countDocuments({votestatus: "notvoted"});
        const count1 = await savemodel.find({boothno:139}).countDocuments({votestatus: "voted"});
        const count = await savemodel.find({boothno:139}).countDocuments();
        res.render("voterlist2",{soildatas:soildatas,count:count,count1:count1,count2:count2});
        
    }else{

        res.render("index");
    }

})
app.get("/archive3/:id",async(req,res)=>{
    
    let id=req.params.id;
    
    const soildatas = await savemodel.findById(id).updateOne({votestatus: "voted"});
    

    if(req.cookies.token){

        const soildatas = await savemodel.find({boothno:140}).sort({ serialno: 1 }).exec();

        const count2 = await savemodel.find({boothno:140}).countDocuments({votestatus: "notvoted"});
        const count1 = await savemodel.find({boothno:140}).countDocuments({votestatus: "voted"});
        const count = await savemodel.find({boothno:140}).countDocuments();
        res.render("voterlist3",{soildatas:soildatas,count:count,count1:count1,count2:count2});
        
    }else{
 
        res.render("index");
    }

})
  
//
   

 
  

//login router

app.post("/login", express.json(), async(req,res)=>{

    // cookie adding 

    try{
        const check=await loginmodel.findOne({username: req.body.username});
        if(!check){

            const message = "You have an invalid username";
            res.render("login", { message: message });
             
        } 
 
        const isPasswordMatch=await bcrypt.compare(req.body.password, check.password);
        if(req.body.username=="admin" && req.body.password=="admin" ){

            res.render("admin");

        }else if(isPasswordMatch){

            const token = jwt.sign({
                userId: check._id,
                username: check.username
            }, secretKey, { expiresIn: '7d' });

            res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); 

            res.render("welcome");
             
        } 
        else{ 
           const message = "You have an invalid password";
            res.render("login",{message:message});
        }
    }catch{
        const message = "You have an invalid password";
            res.render("login",{message:message});
    }
    

   

})

// signup router

app.post("/signup", async(req,res) =>{

    const data={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        password:req.body.password
    }

    const existingUser = await loginmodel.findOne({name:data.username});

    if(existingUser){
        
        res.send("User exist");
    }
    else{ 
        const saltRounds=10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;
        const logindata=await loginmodel.insertMany(data);
        console.log(logindata);
 
    }
     res.render("signup");
    
})
 
// save data router

app.post("/savedata", upload.single("image"), async(req,res) =>{

   // const imageBuffer = fs.readFileSync(req.file.path);
    const userdata={

        serialno:req.body.serialno,
        votername:req.body.votername,
        houseno:req.body.houseno,
        housename:req.body.housename,
        idno:req.body.idno,
        boothno:req.body.boothno,
        squadno:req.body.squadno,
        votestatus:req.body.votestatus,
        date:req.body.date,
        coordinates:req.body.coordinates,
        availability:req.body.availability,
        openvote:req.body.openvote,
        postalvote:req.body.postalvote,
        //image: imageBuffer 
           
    }
   
       
        const savedata=await savemodel.insertMany(userdata);
        console.log(savedata);
       
        
        res.render("welcome");
  
  
    
})

 
  
  

app.listen(port,() => {
    console.log(`server running on port:${port} `);
})
   