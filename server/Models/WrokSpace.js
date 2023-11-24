import mongoose from "mongoose";

const workSpaceSchema = mongoose.Schema({
    
    workSpaceName: {
        type:String,
        
    },
    adminID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AdminModel',
    },
    billingAddress:{
        type:String,
        
    },
    country:{
        type:String,
        
    },
    state:{
        type:String,
        
    },
    city:{
        type:String,
        
    },
    postalcode:{
        type:String,
        
    },
    discountCode:{
        type:String,
        
    },
    referralCode:{
        type:String,
        
    },
     
    createdOn: {
        type: Date,
        default:new Date()
    }
})


const workSpaceModel = mongoose.model('workSpaceModel',workSpaceSchema);
 export default workSpaceModel;