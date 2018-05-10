// HTTP Objekt wird im Code erstellt 
// Interpreter sucht nach jedem möglichen Import im http- Modul  und wird ihn einzeln an das http- Objekt im Code anhängen

import * as Url from "url";
import * as Http from "http";

//namespace erstellen

namespace Node {

    //Interface erstellen

    interface AssocStringString {

        //String als Schlüssel, der Wert ist ebenfalls ein String

        [key: string]: string;
    }

    //Port= Hafen oder Türe, in die Daten zurück kommen können
    //Variable port wird erstellt, als number
    //process.env.PORT= Port wird als Umgebungsvariable festgelegt, um dem Webserver mitzuteilen, welcher Port überwacht werden soll.

    let port: number = process.env.PORT;

    //Wenn der Port nicht definiert ist, liegt er bei 8100
    //8100 (Portnummer) ist der Port, dem der Server zuhören soll

    if ( port == undefined )
        port = 8100;

    //Ereugung des Serverobjektes, Variable server, um immer wieder auf den Server zugreigen zu können

    let server: Http.Server = Http.createServer();

    //Wenn der Server zuhört, wird die Funktion handleListen ausgeführt

    server.addListener( "listening", handleListen );
    server.addListener( "request", handleRequest );
    server.listen( port );

    //Funktion handleListen wird erstellt, wenn der Server zuhört wird in der Konsole "Ich höre" ausgegeben
    //In der Funktion werden keine Parameter benötigt

    function handleListen(): void {
        console.log( "Ich höre?" );
    }

    //Funktion handleRequest wird erstellt, 2 Parameter werden festgelegt
    //Die einkommenden Information werden bearbeitet und wieder zurück geschickt
    //_request: Http.IncomingMessage: Einkommende Informationen
    //_response: Http.ServerResponse: Bearbeitete Informationen

    function handleRequest( _request: Http.IncomingMessage, _response: Http.ServerResponse ): void {
        console.log( "Ich höre Stimmen!" );

        //Variable query wird erstellt
        //Übersetzung in ein assoziatives Array

        let query: AssocStringString = Url.parse( _request.url, true ).query;
        let a: number = parseInt( query["a"] );
        let b: number = parseInt( query["b"] );

        //Umlautprobleme werden behoben

        _response.setHeader( "content-type", "text/html; charset=utf-8" );
        _response.setHeader( "Access-Control-Allow-Origin", "*" );

        //Wenn der Server zugehört und die Daten bearbeitet wurden wird das Ergebnis ausgegben

        _response.write( "Ich habe dich gehört<br/>" );

        //Schlüssel wird durchgegeben

        for ( let key in query )
            //console.log(query[key]);

            //Ausgabe der Queryinformation (a, b)

            _response.write( "Query-Informationen, die eingegeben wurden: " + ( query[key] ) + "<br>" );

        //Ausgabe Ergebnis

        _response.write( "Das Ergebnis ist: " + ( a + b ) );

        //Ende, Inforamtion wird zum Nutzer geschickt

        _response.end();
    }
}