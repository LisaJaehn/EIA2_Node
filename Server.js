//Bindet Url Modul mit ein
"use strict";
const Url = require("url");
//HTTP Objekt wird im Code erstellt 
//Interpreter sucht nach jedem möglichen Import im http- Modul  und wird ihn einzeln an das http- Objekt im Code anhängen
const Http = require("http");
//namespace erstellen
var Node;
(function (Node) {
    //Port= Hafen oder Türe, in die Daten zurück kommen können
    //Variable port wird erstellt, als number
    //process.env.PORT= Port wird als Umgebungsvariable festgelegt, um dem Webserver mitzuteilen, welcher Port überwacht werden soll.
    let port = process.env.PORT;
    //Wenn der Port nicht definiert ist, liegt er bei Nummer 8100
    //8100 (Portnummer) ist der Port, dem der Server zuhören soll
    if (port == undefined)
        port = 8100;
    //Ereugung des Serverobjektes, Variable server, um mit dem Server weiter arbeiten zu können (Zugriff möglich)
    let server = Http.createServer();
    //Wenn der Server zuhört, wird die Funktion handleListen ausgeführt
    server.addListener("listening", handleListen);
    // Server beibringen auf etwas zu hören
    server.addListener("request", handleRequest);
    server.listen(port);
    //Funktion handleListen wird erstellt, wenn der Server zuhört wird in der Konsole "Ich höre" ausgegeben
    //In der Funktion werden keine Parameter benötigt
    function handleListen() {
        //Ausgabe im Terminal bzw. Konsole
        console.log("Ich höre?");
    }
    //Funktion handleRequest wird erstellt, 2 Parameter werden festgelegt, ohne Rückgabewert
    //Die einkommenden Information werden bearbeitet und wieder zurück geschickt
    //_request: Http.IncomingMessage: Einkommende Informationen
    //_response: Http.ServerResponse: Bearbeitete Informationen
    function handleRequest(_request, _response) {
        //Ausgabe im Terminal bzw. Konsole
        console.log("Ich höre Stimmen!");
        //Variable query wird erstellt
        //Übersetzung in ein assoziatives Array
        // umwandeln von /?a=10&b=20 in ein JavaScript-Objekt
        let query = Url.parse(_request.url, true).query;
        //Definiere a als Variable
        let a = parseInt(query["a"]);
        //Definiere a als Variable
        let b = parseInt(query["b"]);
        //Umlautprobleme werden behoben, Schriftart wird dadurch ebenfalls geändert
        _response.setHeader("content-type", "text/html; charset=utf-8");
        //Wird für alle zugänglich gemacht
        _response.setHeader("Access-Control-Allow-Origin", "*");
        //Ausgabe im Terminal bzw. Konsole
        _response.write("Ich habe dich gehört<br/>");
        //Schlüssel wird durchgegeben
        for (let key in query)
            //console.log(query[key]);
            //Ausgabe der Queryinformation (a, b)
            _response.write("Query-Informationen, die eingegeben wurden: " + (query[key]) + "<br>");
        //Wenn der Server zugehört und die Daten bearbeitet wurden wird das Ergebnis ausgegben
        //Lösung erscheint im Browserfenster
        _response.write("Das Ergebnis ist: " + (a + b));
        //Ende, Inforamtion wird zum Nutzer geschickt
        _response.end();
    }
})(Node || (Node = {}));
//# sourceMappingURL=Server.js.map