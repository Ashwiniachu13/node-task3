const express=require("express");
const app=express();
const port=3001;


app.use(express.json());

const  {LocalStorage} = require('node-localstorage')
const localStorage = new LocalStorage('./files');

let register=[];


app.post("/register",(req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        return res.status(400).json({error:"all fields are requires"})
    }
    if(register.some(register=>register.email===email)){
        return res.status(409).json({error:"email is already exist"})
    }
    const user={username,email,password};
    register.push(user)
   
    res.status(200).json({message:"user registered successfully"})
    


app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({error:"email and password are required"})
    }
    const user=register.find(register=>register.email===email);
    if(!user){
        return res.status(401).json({error:"invalid credentials"})
    }
    if(user.password!==password){
        return res.status(401).json({error:"invalid credentials"})
    }
   


localStorage.setItem("value",JSON.stringify(user));
    const storedValue = localStorage.getItem("value");
    res.send({storedValue});

    res.status(200).json({message:"login successfully"});

});
});


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})