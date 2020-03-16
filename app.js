const 
    express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    io = require("socket.io")(http);

app.set("port", process.env.PORT || 3000);

const Core = require("./server/core");

app.use(express.static("./public"));

io.on("connection", new Core().conn);

http.listen(app.get("port"), () => {
    console.log("Server listening on :" + app.get("port"));
});