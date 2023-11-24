import mongoose from "mongoose";
const TeamMemberSchema=mongoose.Schema({
   
    toTeamMemberEmail:{
        type:String,
        
      },
    inviteAs:{
        type: Number,
        enum:[0,1],
        default:0
        
    },
    adminID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AdminModel',
    },
    workSpaceID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'workSpaceModel',
    },
    project:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'ProjectModel',
    },
    internalClient:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'ProjectModel',
    },
    externalClient:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'ProjectModel',
        
    },
    customMessage:{
        type:String,
        
    },
     
    createdOn: {
        type: Date,
        default:new Date()
    }
})


const TeamMemberModel = mongoose.model('TeamMemberModel',TeamMemberSchema);
 export default TeamMemberModel;