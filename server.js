const fs = require('fs'),
    http = require("http");
var qs = require("querystring");

let tab = [], turn = "white", lastMove = null;

function adduser(user) {
    if (tab.length == 2) {
        return {res: "tooManyUsers"};
    } else if (tab.indexOf(user) == -1) {
        tab.push({name: user, color: (tab.length == 1) ? "white" : "black"});
        return {res: "added", type: (tab.length == 1) ? "white" : "black"};
    } else {
        return {res: "userExist"};
    }
}

function reset() {
    tab = []
}

var server = http.createServer(function (req, res) {
    switch (req.url) {
        case "/img/blocks.gif":
            fs.readFile("public/img/Blocks.gif", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pli/u!<h1>");
                    res.end();
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'image/gif' });
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "/Game.js":
            console.log(req.url);
            fs.readFile("public/js/Game.js", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pli/u!<h1>");
                    res.end();
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "/Ui.js":
            console.log(req.url);
            fs.readFile("public/js/Ui.js", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "/Main.js":
            console.log(req.url);
            fs.readFile("public/js/Main.js", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "/Net.js":
            console.log(req.url);
            fs.readFile("public/js/Net.js", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "/style.css":
            console.log(req.url);
            fs.readFile("public/style/style.css", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "/three.js":
            console.log(req.url);
            fs.readFile("public/libs/three.js", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                }
            });
            break;
        case '/api/login':

            var allData = "";

            //kiedy przychodzą dane POSTEM, w postaci pakietów,
            //łącza się po kolei do jednej zmiennej "allData"
            // w poniższej funkcji nic nie modyfikujemy

            req.on("data", function (data) {
                console.log("data: " + data)
                allData += data;
            })

            req.on("end", function (data) {
                var finishObj = qs.parse(allData)
                console.log(finishObj)
                switch (finishObj.action) {
                    //dodanie nowego usera
                    case "login":
                        let tmp = {}
                        tmp = adduser(finishObj.user);
                        res.end(JSON.stringify(tmp));
                        break;
                    //inna akcja
                    case "reset":
                        reset();
                        break;
                }
            })
            break;
        case "/api/is_logged":
            var allData = "";

            //kiedy przychodzą dane POSTEM, w postaci pakietów,
            //łącza się po kolei do jednej zmiennej "allData"
            // w poniższej funkcji nic nie modyfikujemy

            req.on("data", function (data) {
                console.log("data: " + data)
                allData += data;
            });

            req.on("end", (data) => {
               if(tab.length === 2) {
                   console.log("logged");
                   res.end(JSON.stringify({res: "logged"}))
               } else {
                   console.log("not");
                   res.end(JSON.stringify({res: "not"}))
               }
            });
            break;
        case "/api/is_my_turn":
            var allData = "";

            //kiedy przychodzą dane POSTEM, w postaci pakietów,
            //łącza się po kolei do jednej zmiennej "allData"
            // w poniższej funkcji nic nie modyfikujemy

            req.on("data", function (data) {
                console.log("data: " + data)
                allData += data;
            });

            req.on("end", (data) => {
                var finishObj = qs.parse(allData);
                // console.log(finishObj);
                console.log(tab);
                let tmp = tab.find(value => {
                    if(value.name === finishObj.name)
                        return value;
                    else
                        return false;
                });
                console.log(tmp, turn);
               if(tmp.color === turn) {
                   res.end(JSON.stringify({res: true, lastMove: lastMove}))
               } else {
                   res.end(JSON.stringify({res: false}))
               }
            });
            break;
        case "/api/move":
            var allData = "";

            req.on("data", function (data) {
                console.log("data: " + data)
                allData += data;
            });

            req.on("end", (data) => {
                var finishObj = qs.parse(allData);
                console.log(finishObj);
                lastMove = finishObj;
                turn = (turn == "black") ? "white" : "black";
                res.end(JSON.stringify({res: "done"}));
            });
            break;
        default:
            console.log(req.url);
            fs.readFile("public/index.html", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                }
            });
            break;
    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});
