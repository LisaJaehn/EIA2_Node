//HTTP Objekt wird im Code erstellt 
//Interpreter sucht nach jedem möglichen Import im http- Modul  und wird ihn einzeln an das http- Objekt im Code anhängen
"use strict";
console.log("jeff");
const Url = require("url");
const Http = require("http");
//namespace erstellen
var Node;
(function (Node) {
    //Port= Hafen oder Türe, in die Daten zurück kommen können
    //Variable port wird erstellt, als number
    //process.env.PORT= Port wird als Umgebungsvariable festgelegt, um dem Webserver mitzuteilen, welcher Port überwacht werden soll.
    let port = process.env.PORT;
    //Wenn der Port nicht definiert ist, liegt er bei 8100
    //8100 (Portnummer) ist der Port, dem der Server zuhören soll
    if (port == undefined)
        port = 8100;
    //Ereugung des Serverobjektes, Variable server, um immer wieder auf den Server zugreigen zu können
    let server = Http.createServer();
    //Wenn der Server zuhört, wird die Funktion handleListen ausgeführt
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);
    //Funktion handleListen wird erstellt, wenn der Server zuhört wird in der Konsole "Ich höre" ausgegeben
    //In der Funktion werden keine Parameter benötigt
    function handleListen() {
        console.log("Ich höre?");
    }
    //Funktion handleRequest wird erstellt, 2 Parameter werden festgelegt
    //Die einkommenden Information werden bearbeitet und wieder zurück geschickt
    //_request: Http.IncomingMessage: Einkommende Informationen
    //_response: Http.ServerResponse: Bearbeitete Informationen
    function handleRequest(_request, _response) {
        console.log("Ich höre Stimmen!");
        //Variable query wird erstellt
        //Übersetzung in ein assoziatives Array
        let query = Url.parse(_request.url, true).query;
        let a = parseInt(query["a"]);
        let b = parseInt(query["b"]);
        //Schlüssel wird durchgegeben
        for (let key in query)
            console.log(query[key]);
        //Umlautprobleme werden behoben
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        //Wenn der Server zugehört und die Daten bearbeitet wurden wird das Ergebnis ausgegben
        _response.write("Ich habe dich gehört<br/>");
        _response.write("Das Ergebnis ist: " + (a + b));
        _response.end();
    }
})(Node || (Node = {}));
//# sourceMappingURL=Node.js.map