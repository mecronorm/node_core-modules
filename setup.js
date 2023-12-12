const path = require("path");
const fs = require("fs");
const http = require("http")
const pages = ["contact", "about", "blog"]

const server = http.createServer();


function catchError(err) {
    console.error("Error code :", err.code);
    console.error(err.message)
}

function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function createDirectory(name) {
    try {
        fs.mkdirSync(path.join(__dirname, name))
    } catch (err) {
        catchError(err)
    }
}

function createIndex(directory){
    try {
        if (directory != "./") {
            fs.writeFileSync(path.join(__dirname, directory, "index.html"), "<!DOCTYPE html>\n<html lang='en'>\n<head>\n\t<meta charset='UTF-8'>\n\t<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n\t<title>"+directory+"</title>\n\t<style>body{\n\tbackground-color: " +getRandomRgb()+ ";\n}</style>\n<link rel='stylesheet' href='style.css'>\n</head>\n<body>\n\t<h1>"+directory+"</h1>\n</body>\n</html>")
        } else {
            fs.writeFileSync(path.join(__dirname, directory, "index.html"), "<!DOCTYPE html>\n<html lang='en'>\n<head>\n\t<meta charset='UTF-8'>\n\t<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n\t<style>body{\n\tbackground-color: " +getRandomRgb()+ ";\n}</style>\n<title>Main</title>\n\t<link rel='stylesheet' href='style.css'>\n</head>\n<body>\n\t<h1>main</h1>\n</body>\n</html>")
        }
    } catch (err) {
        catchError(err)
    }
}

function createStyle(directory){
    fs.writeFileSync(path.join(__dirname, directory, "style.css"), "body{\n\tbackground-color: " +getRandomRgb()+ ";\n}")
}

function createMain() {
    const main = "./"
    createIndex(main)
    createStyle(main)
}

function createText() {
    const os = require("os")
    fs.writeFileSync(path.join(__dirname, "./", "info.txt"), "This is being run on a "+os.version+" computer!")
}

function createWebsiteLayout() {
    createMain()
    createText()
    pages.forEach(page => {
        createDirectory(page)
        createIndex(page)
        createStyle(page)
    });
}

createWebsiteLayout()

server.on("request", (req, res) => {
    console.log("a request has been submitted " +req.url)
    if (req.url === "/style.css") {
        res.end()
    }
    if (req.url === "/") {
        fs.readFile(path.join(__dirname, '/', 'index.html'), (err, data)=>{
            res.write(data)
            res.end()
        })
    }
    if (req.url === "/" + pages[0]) {
        fs.readFile(path.join(__dirname, '/' + pages[0], 'index.html'), (err, data)=>{
            res.write(data)
            res.end()
        })
    }
    if (req.url === "/" + pages[1]) {
        fs.readFile(path.join(__dirname, '/' + pages[1], 'index.html'), (err, data)=>{
            res.write(data)
            res.end()
        })
    }
    if (req.url === "/" + pages[2]) {
        fs.readFile(path.join(__dirname, '/' + pages[2], 'index.html'), (err, data)=>{
            res.write(data)
            res.end()
        })
    }
})

server.listen(3000,()=> {
    console.log("is running on http://localhost:3000")
})