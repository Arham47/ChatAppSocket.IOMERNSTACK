import mongoose from "mongoose";
const TaskSchema=mongoose.Schema({
   
    taskName:{
        type:String,
        required:true,
    },
    taskDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AdminModel',
    },
    workSpace:{
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
    priorty:{
        type: Number,
        enum:[0,1,2],
        default:0
        
    },
    teamMember:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'TeamMemberModel',
        
    },
    dueDate:{
        type:String,
    },
    recurrenceOfTask:{
        type: Number,
        enum:[0,1,2,3,4],
        default:0
        
    },
    endOfRecurrenceOfTask:{
        type: Number,
        enum:[0,1,2,3,4],
        default:0
        
    },

    onGoing:{
        type:Boolean,
        
    },
    taskTag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TaskModel',
    },

     attachmentDetails:{
        type:String,
        
    },
    attachment: {
         type:String
     }
    
     ,
     
    createdOn: {
        type: Date,
        default:new Date()
    }

    
})


const TaskModel = mongoose.model('TaskModel',TaskSchema);
 export default TaskModel;  