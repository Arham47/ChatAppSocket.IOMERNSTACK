import mongoose from "mongoose";
const BrainSchema=mongoose.Schema({
   
    workSpaceID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'workSpaceModel',
    },
    adminID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AdminModel',
    },
    projectID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProjectModel',
    },

    notes: {
      type:String
  }
    ,
    createdOn: {
        type: Date,
        default:new Date()
    }
    

    
})


const BrainModel = mongoose.model('BrainModel',BrainSchema);
 export default BrainModel;