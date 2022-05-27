const router = require ("express").Router();
const User = require("..//models/User");
const CryptoJS = require("crypto-js")

//register
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,

        password : CryptoJS.AES.encrypt(req.body.password, "BANGKIT-PASS").toString(),

    });
    try{
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    }catch(err){
        res.status(500).json(err);

    }

});

//login
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username : req.body.username});
        if(!user){
            res.status(400).json({
                message: "user not found"
            });
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, "BANGKIT-PASS");
        const password = hashedPassword.toString(CryptoJS.enc.Utf8);

    
    }catch(err){
        res.status(500).json(err);

    }

})

module.exports = router;