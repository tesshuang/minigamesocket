const port = process.env.PORT || 10000;

const server = require("http").Server();
var io = require("socket.io")(server);

//var allusers = [];
/*var allusers1 = [],
    allusers2 =[];*/

var allusers ={
    
};

io.on("connection", function(socket){
    
    console.log("connected");
    /*allusers.push(socket.id);
    console.log(allusers);*/
    
    
    socket.on("joinroom", function(data){
        console.log(data);
        socket.join(data);
        
        socket.myRoom = data;
        socket.emit("yourid", socket.id);
        
/*        if(data == "room1"){
            allusers1.push(socket.id);
            io.to(data).emit("userjoined", allusers1);
            
        }else if(data == "room2"){
            
            allusers2.push(socket.id);
            io.to(data).emit("userjoined", allusers2);
        }*/
        
        if(!allusers[data]){
            allusers[data] = [];
        }
        
        allusers[data].push(socket.id);
        io.to(data).emit("userjoined", allusers[data]);
    });
    
    //socket.emit("yourid", socket.id);
    
    //io.emit("userjoined", allusers);
    
    socket.on("mymove", function(data){
        socket.to(this.myRoom).emit("newmove", data);
    })
    
    socket.on("disconnect", function(){
        /*var index = allusers.indexOf(socket.id);
        allusers.splice(index, 1);
        io.emit("userjoined", allusers);*/
        
        var index = allusers[this.myRoom].indexOf(socket.id);
        allusers[this.myRoom].spice(index,1);
        io.to(this.myRoom).emit("userjoined", allusers[this.myRoom]);
        
    })
})

server.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    
    console.log("Socket is running.");
})