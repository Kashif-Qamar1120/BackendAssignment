const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');

// for user register --> /api/v1/register

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'public_id_here',
            url: 'avatar_url_here'
          },
        
    })

   
    res.status(201).json({
        status: 'success',
        message: 'Congratulatios User Register Successfully',
        data: user
    })


})

// for  user login if register --> /api/v1/login

 exports.loginUser = catchAsyncError(async(req , res , next)=>{

    const {email , password} = req.body;

    //  email and password is enterd by user is correct or not
    if(!email || !password){
        return next(new ErrorHandler('PLEASE Enter email & password', 400))
    }

    // it will find in  the  user in database
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('incorect Email or Password', 401));
    }

    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(isPasswordMatched){
        return next(new ErrorHandler('Invalid  Password', 401));
    }


res.status(201).json({
    status: 'success',
    message: ' Congratulatios User created successfully',
    data: user
})

 })

 // logout user => /api/v1/logout

 exports.logout = catchAsyncError(async (rea , res , next) =>{
    res.cookie('token'  , null , {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Successfully log out'
    })
 })