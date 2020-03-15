const 
    express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    io = require("socket.io")(http);

const Core = require("./server/core");

app.use(express.static("./public"));

io.on("connection", new Core().conn);

http.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on :${process.env.PORT || 3000}`);
});