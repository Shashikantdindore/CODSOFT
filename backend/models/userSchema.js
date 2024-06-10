import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "Please Provide Name"] ,
        minLength :[3, "Name must contain atleast 3 characters"],
        maxLength :[30, "Name cannot exceed 30 characters"]

    },

    email:{
        type: String,
        required: [true, "please provide your email"],
        validator: [validator.isEmail,"Please provide a valid email"],

    },
    phone:{
        type: Number,
        required: [true , "Please provide your  phone number"]
    },
    password:{
        type: String,
        required : [true , "Please provide your password"],
        minLength :[8, "Password must contain atleast 8 characters"],
        maxLength :[12, "Name cannot exceed 20 characters"],
        select: false

    },

    role:{
        type:String,
        required: [true , "Please provide your role"],
        enum:["JobSeeker", "Employer"],

    },

    createdAt:{
        type: Date,
        default: Date.now,
    }
});


//hashing the password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//comparing password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);

};

//Genrating Web Token for authrazation 

userSchema.methods.getJWTToken= function(){
    return jwt.sign({
        id: this.id
    } , process.env.JWT_SECRET_KEY, {
        expiresIn:process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);
