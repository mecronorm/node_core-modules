import http from "http";
import { log } from "util";

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("a request has been submitted")
    res.end()
})

server.listen(3000,()=> {
    console.log("is running on http://localhost:3000")
})

