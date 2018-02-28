var ws = require("nodejs-websocket")
var PORT = 8001
 
// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error", function(err) {
        console.log("handle error")
        console.log("websocket server has error: " + err)
    })
}).listen(PORT)

console.log("webSocket server listening port: " + PORT)