const 
    express = require("express"),
    io = require("socket.io"),
    app = express(),
    http = require("http").createServer(app);

app.get("/", (req, res) => {
    res.send("Olá");
});

io.on("connection", socket => {
    console.log("Conectou");
});

http.listen(3000, () => {
    console.log("Server now listening on :3000");
});