const catchAsyncError = require('./catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

// for user it will check if the user is authenticated or not

exports.isAuthenticatedUser = catchAsyncError(async(req , res , next)=>{
 
    const {token} = req.cookies;
   
    if(!token){
        return next(new ErrorHandler('Sorry Login First to access this Resource' , 401))
    }
   
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user = await UserActivation.findById(decoded.id)

    next()

})


exports.authorizeRoles = (...roles) => {
    return (req , rea , next) => {
        if(roles.includes(req.user.role)){
           
            new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource` , 403)
        } 
        next()
    }
}
