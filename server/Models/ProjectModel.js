import mongoose from "mongoose";
const ProjectSchema=mongoose.Schema({
   
    title:{
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
    dueDate:{
        type:String,
    },
    onGoing:{
        type:Boolean,
        
    },
    flowTag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProjectModel',
    },
    adminMember:{
        type:Boolean,
        
    },
    teamMember:{
        type:[mongoose.Schema.Types.ObjectId],
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


const ProjectModel = mongoose.model('ProjectModel',ProjectSchema);
 export default ProjectModel;