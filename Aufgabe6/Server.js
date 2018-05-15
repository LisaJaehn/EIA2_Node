//Bindet Url Modul mit ein
"use strict";
const Url = require("url");
//HTTP Objekt wird im Code erstellt
//Interpreter sucht nach jedem möglichen Import im http- Modul  und wird ihn einzeln an das http- Objekt im Code anhängen
const Http = require("http");
//namespace erstellen
var Node;
(function (Node) {
    let studis = {};
    // Todo: Ändern!
    let port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    let server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);
    function handleListen() {
    }
    function handleRequest(_request, _response) {
        _response.setHeader('Access-Control-Allow-Origin', '*');
        _response.setHeader('Access-Control-Request-Method', '*');
        _response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        _response.setHeader('Access-Control-Allow-Headers', '*');
        let query = Url.parse(_request.url, true).query;
        //console.log(query);
        if (query["method"] == "addStudent") {
            let student = JSON.parse(query["data"].toString());
            studis[student.matrikel.toString()] = student;
            _response.write("Student added!");
            _response.end();
        }
        if (query["method"] == "refreshStudents") {
            _response.write(JSON.stringify(studis));
            _response.end();
        }
    }
})(Node || (Node = {}));
//# sourceMappingURL=Server.js.map