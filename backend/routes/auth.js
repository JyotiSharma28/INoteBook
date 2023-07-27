const express=require('express');
const User=require('../models/User')
const bcrypt=require('bcryptjs')   //security purpose 
const jwt=require('jsonwebtoken')  //token for user
const JWT_SECRET='hellomiss'      //sailt
const router=express.Router();
const {body,validationResult}=require('express-validator') //validation
const fetchuser=require('../middleware/fetchuser')


//ROUTE 1:create a User using: POST "/api/auth/createuser" No Login required
router.post('/createuser',[
        body('name',"enter a valid.name is should be minimum 3 character").isLength({min:3}),
        body('email','please enter valid email').isEmail(),
        body('password',"password must be greater than 4").isLength({min:5})

],async(req,res)=>{
    
    let success=false
    //if ther are error ,return bad request and errors
     const errors=validationResult(req);
     if(!errors.isEmpty()){     //if any error occour
        return res.status(400).json({success,errors:errors.array()});;  //404 error
     }
    //check whether the user with this exits already
    try{

        let user=await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({success,error:"Sorry a user with this email already exists"})
        }

        const salt= await bcrypt.genSalt(10);  //using hashing concept main passeord+salt(random generate)
        secPass=await bcrypt.hash(req.body.password,salt) 
        //create a new user
         user=await User.create({       
            name:req.body.name,
            email:req.body.email,
            password:secPass
         })
        //  .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error:'please enter a unique value for email',message:err.message})})
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)
        success=true
        res.json({success,authtoken})

    }catch(error){
        console.error(error.message)
        res.status(500).send("some error occured")
    }
    
})


//ROUTE-2 :authenticate user  using: POST "/api/auth/login" No Login required
router.post('/login',[
    body('email','please enter valid email').isEmail(),
    body('password',"password can not be blank").exists()

],async(req,res)=>{

    let success=false
    const errors=validationResult(req);
    if(!errors.isEmpty()){     //if any error occour
       return res.status(400).json({errors:errors.array()});;  //404 error
    }

    const {email,password}=req.body
    try{

        let user=await User.findOne({email})
        if(!user){
            success=false
            return res.status(400).json({error:'please try to login with correct credentials'})
        }

        const passwordCompare=await bcrypt.compare(password,user.password)  //user enter password then check with databasestores password if those match after  it will return id of user
        
        if(!passwordCompare){ 
            success=false
            return res.status(400).json({success,error:'please try to login with correct credentials'})
        }
        const data={
            user:{
                id:user.id
            }
        }

    const authtoken=jwt.sign(data,JWT_SECRET)
    success=true
    res.json({success,authtoken})

}catch(error){
    console.error(error.message)
    res.status(500).send("Internal server Error")
}
    
})

//ROUTE-3: GET loggedin user details  using: POST "/api/auth/getuser" Login required
router.post('/getuser',fetchuser,async(req,res)=>{
try {
    userId=req.user.id;
    const user=await User.findById(userId).select('-password') //WITHOUT PASSWORD
    res.send(user)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server Error")
}
})

module.exports=router