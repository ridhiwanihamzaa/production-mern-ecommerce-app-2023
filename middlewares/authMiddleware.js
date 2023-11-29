import JWT from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

//protected routes token base
export const requiresSignIn = async (req,res,next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log()
    }
}

//admin access
export const isAdmin = async (req,res,next) =>{
    try {
        const user = await UserModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:'Unauthorised Access'
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin middleware'
        })
    }
}
