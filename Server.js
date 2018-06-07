"use strict";
const Url = require("url");
const Http = require("http");
var Aufgabe7;
(function (Aufgabe7) {
    let studiHomoAssoc = {};
    let port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    let server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);
    function handleListen() {
        console.log("ich höre... xd" + port);
    }
    function handleRequestSetHeaders(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
    }
    function handleRequest(_request, _response) {
        let query = Url.parse(_request.url, true).query;
        console.log(query["command"]);
        if (query["command"]) {
            switch (query["command"]) {
                case "insert":
                    insert(query, _response);
                    break;
                case "refresh":
                    refresh(_response);
                    break;
                case "search":
                    search(query, _response);
                    break;
                default: error();
            }
        }
        _response.end();
    }
    function insert(query, _response) {
        let object = JSON.parse(query["data"]);
        let _name = object.name;
        let _firstname = object.firstname;
        let matrikel = object.matrikel.toString();
        let _age = object.age;
        let _gender = object.gender;
        let _studiengang = object.studiengang;
        let studi;
        studi = {
            name: _name,
            firstname: _firstname,
            matrikel: parseInt(matrikel),
            age: _age,
            gender: _gender,
            studiengang: _studiengang
        };
        studiHomoAssoc[matrikel] = studi;
        _response.write("Data received");
    }
    function refresh(_response) {
        console.log(studiHomoAssoc);
        for (let matrikel in studiHomoAssoc) {
            let studi = studiHomoAssoc[matrikel];
            let line = matrikel + ": ";
            line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + ", ";
            line += studi.gender ? "male" : "female";
            _response.write(line + "\n");
        }
    }
    function search(query, _response) {
        let studi = studiHomoAssoc[query["searchFor"]];
        if (studi) {
            let line = query["searchFor"] + ": ";
            line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + ", ";
            line += studi.gender ? "male" : "female";
            _response.write(line);
        }
        else {
            _response.write("Not found");
        }
    }
    function error() {
        alert("Error");
    }
})(Aufgabe7 || (Aufgabe7 = {}));
//# sourceMappingURL=Server.js.map