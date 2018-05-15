//Bindet Url Modul mit ein

import * as Url from "url";

//HTTP Objekt wird im Code erstellt
//Interpreter sucht nach jedem möglichen Import im http- Modul  und wird ihn einzeln an das http- Objekt im Code anhängen

import * as Http from "http";

//namespace erstellen
namespace Node {
    let studis: L06_Interfaces.Studis = {};

    interface AssocStringString {
        [key: string]: string | string[];
    }

    // Todo: Ändern!
    let port: number = process.env.PORT;

    if ( port == undefined )
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener( "listening", handleListen );

    server.addListener( "request", handleRequest );
    server.listen( port );


    function handleListen(): void {

    }

    function handleRequest( _request: Http.IncomingMessage, _response: Http.ServerResponse ): void {
        _response.setHeader('Access-Control-Allow-Origin', '*');
        _response.setHeader('Access-Control-Request-Method', '*');
        _response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        _response.setHeader('Access-Control-Allow-Headers', '*');

        let query: AssocStringString = Url.parse(_request.url, true).query;
        //console.log(query);

        if (query["method"] == "addStudent") {
            let student = <L06_Interfaces.Studi>JSON.parse(query["data"].toString());
            studis[student.matrikel.toString()] = student;
            _response.write("Student added!");
            _response.end();
        }

        if (query["method"] == "refreshStudents") {
            _response.write(JSON.stringify(studis));
            _response.end();
        }
    }
}