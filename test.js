const port = process.env.PORT || 10000;

const server = require("http").Server();
var io = require("socket.io")(server);

var allqs= {};


io.on("connection", function(socket){
    
    console.log("connected");
    
    socket.on("joinroom", function(data){
        console.log(data);
        
        socket.join(data);
        socket.myRoom = data;
        
        if(!allqs[data]){
            allqs[data] ={
                qobj:{}
            };
        }
    });
    
    socket.on("answer", function(data){
        var msg = "WRONG!";
        if(data === allqs[socket.myRoom].qobj.a){
            msg = "You won."
        }
        socket.emit("result", msg);
    })
    
    socket.on("createqs", function(data){
       console.log(data);
        allqs[socket.myRoom].qobj = data;
        socket.to(socket.myRoom).emit("newq",data);
    });
    
    socket.on("disconnect", function(){
        console.log("user disconnect");
        
    })
})

server.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    
    console.log("Socket is running.");
})