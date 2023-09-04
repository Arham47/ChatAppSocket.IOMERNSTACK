export default class TypingClass{
    socket;
    constructor(socket){
        this.socket = socket;
    }
    
 typingStopController = ({ roomId }) => {
    let skt = this.socket.broadcast
  
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-stoped-from-server");
}
  typingStart=({ roomId }) => {
    let skt = this.socket.broadcast
  
    skt = roomId ? skt.to(roomId) : skt;

    skt.emit("typing-started-from-server");
}
}

