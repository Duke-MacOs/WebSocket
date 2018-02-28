var ws = require("nodejs-websocket")
var PORT = 8001

var clientCount = 0;
 
// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++;
    conn.nickname = 'user' + clientCount;
    broadcast(getJSONObj(conn.nickname + '登陆了~！', 'login'));
    conn.on("text", function (str) {
        console.log("Received "+str)
        if (str) {
            let st = getJSONObj(str, 'message');
            broadcast(st);
        }
        // conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        broadcast(getJSONObj(conn.nickname + '退出了~！', 'loginout'));
        clientCount--;
    })
    conn.on("error", function(err) {
        console.log("handle error")
        console.log("websocket server has error: " + err);
        broadcast(getJSONObj(conn.nickname + '退出了~！', 'loginout'));
    })
}).listen(PORT)

function getJSONObj(msg, type) {
    return JSON.stringify({
        message: msg,
        type
    });
}

function broadcast(str) {
    server.connections.forEach(function(connect) {
        connect.sendText(str);
    });    
}

console.log("webSocket server listening port: " + PORT)