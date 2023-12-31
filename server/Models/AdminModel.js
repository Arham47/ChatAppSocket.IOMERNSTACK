import mongoose from "mongoose";
import bcrypt from "bcrypt"
const AdminSchema=mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        unique: true ,
        lowercase:true,
               
      },
    firstName:{
        type:String,
        
    },
    
    lastName:{
        type:String,
        
    },
  
    userName:{
        type:String,
        
    },
    password:{
        type:String,
        required:true,
    },
    stripeCutomerId:{
        type:String,
        
    },
    subscribed:{type:Boolean,default:false}
})
AdminSchema.pre("save",async function(next){
    const salt= await bcrypt.genSalt();
    this.password=  await bcrypt.hash(this.password,salt);
    next()

})

const AdminModel = mongoose.model('AdminModel',AdminSchema);
 export default AdminModel;