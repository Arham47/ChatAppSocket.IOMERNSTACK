import mongoose from "mongoose";
const ClientSchema=mongoose.Schema({
   
    clientName:{
        type:String,
        required:true,
    },
    adminID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AdminModel',
    },
    workSpaceID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'workSpaceModel',
    },
    brief:{
        type: String,
        required:true,
    },
    image:{
        type:String,
    },
    clientTag:{
        type:String, //this need to be fix 
    },
    clientType:{
        type: Number,
        enum:[0,1],
        default:0
        
    },
    teamMember:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'TeamMemberModel',
        
    },
    adminMember:{
        type:Boolean,
        
    },
    inviteClient:{
        type:String,
        ref:'TeamMemberModel',
        
    },
    inviteMessage:{
        type:String,
        
    },
     
    createdOn: {
        type: Date,
        default:new Date()
    }
    
})


const ClientModel = mongoose.model('ClientModel',ClientSchema);
 export default ClientModel;