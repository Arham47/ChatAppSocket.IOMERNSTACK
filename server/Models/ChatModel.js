import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
  chatName: {
    type: String,
    required: true,
  },
  chatType: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectModel',
    required: function () {
      return !this.clientID && !this.GroupID;
    },
  },
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientModel',
    required: function () {
      return !this.projectID && !this.groupID;
    },
  },
  groupID: {
    type: String,
    required: function () {
      return !this.projectID && !this.clientID;
    },
  },
  workSpaceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workSpaceModel',
    required: true,
  },
  adminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdminModel',
    required: true,
    },
     
    createdOn: {
        type: Date,
        default:new Date()
    }
});

const ChatModel = mongoose.model('ChatModel', ChatSchema);
export default ChatModel;
