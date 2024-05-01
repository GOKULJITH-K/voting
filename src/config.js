const mongoose = require("mongoose");
const connect=mongoose.connect("mongodb+srv://mongo:UNE8bmYvV38FARx5@cluster0.l2ubs1d.mongodb.net/cpm");



connect.then(() =>{
    console.log("database connected succesfully");
})
.catch(() =>{
    console.log("failed");
})

//schema users
const LoginSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

// model users
const loginmodel = mongoose.model("users",LoginSchema);


// schema savedata
const saveSchema = new mongoose.Schema({
    serialno:{
        type: String,
        required: true,
        
        
    },
    votername:{
        type: String,
        required: true
        
    },
    houseno:{
        type: String,
        required: true
        
    },
    housename:{
        type: String,
        required: true
        
    }, 
    idno:{
        type: String,
        required: true
        
    }, 
    boothno:{
        type: String,
        required: true
        
    }, 
    squadno:{
        type: String,
        required: true
        
    }, 
    votestatus:{
        type: String,
        required: true
        
    }, 
   
    date:{
        type: String,
        
    }, 
    coordinates:{  
        type: String,
        
    },
    availability:{  
        type: String,
        
    },
    openvote:{  
        type: String,
        
    },
    postalvote:{  
        type: String,
        
    },
   
   
});
  
// model savedata
const savemodel = mongoose.model("voters_list",saveSchema);

//model farmers



// feedback



//schema test


// exports

module.exports ={
    loginmodel,
    savemodel,
    
};

