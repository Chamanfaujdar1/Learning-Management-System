import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema=new Schema({
    fullName:{
        type:String,
        required:[true,'Name is required'],
        minLength:[5,"Name must be atleast 5 character"],
        maxLength:[15,"Name must be atmost 15 character"],
        lowercase:true,
        trim:true,

    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        lowercase:true,
        trim:true,
        match:[
            /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/gm,
            "please enter valid email"
        ]
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:[5,"password must be atleast 5 character"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,

        },
        secure_url:{
            type:String,

        }
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
} , {timestamps:true})


userSchema.pre('save',async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
})


userSchema.methods={
    generateJWTToken:async function () {
        return await jwt.sign(
            {
                id:this._id,
                email:this._email,
                subscription:this.subscription,
                role:this.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY
            }
        )
    }
}

const User =model('User',userSchema)

export default User