const 
    express = require("express"),
    app = express(),
    http = require("http").createServer(app);
    io = require("socket.io")(http);

const Core = require("./core");

io.on("connection", new Core().conn);

app.use(express.static("../public"));


http.listen(3000, () => {
    console.log("Server now listening on :3000");
});