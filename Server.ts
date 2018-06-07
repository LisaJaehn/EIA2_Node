import * as Url from "url";
import * as Http from "http";
import * as Database from "./Database";

    namespace Aufgabe7 {

        interface Studi {
            name: string;
            firstname: string;
            studiengang: string;
            matrikel: number;
            age: number;
            gender: boolean;
        }

        interface Studis {
            [matrikel: string]: Studi;
        }

        interface Object {
            [key: string]: string;
        }

        let studiHomoAssoc: Studis = {};


        let port: number = process.env.PORT;


        if ( port == undefined )
            port = 8100;

        let server: Http.Server = Http.createServer();
        server.addListener( "listening", handleListen );
        server.addListener( "request", handleRequest );
        server.listen( port );

        function handleListen(): void {
            console.log( "ich höre... xd" + port );
        }

        function handleRequestSetHeaders( _request: Http.IncomingMessage, _response: Http.ServerResponse ): void {
            _response.setHeader( "content-type", "text/html; charset=utf-8" );
            _response.setHeader( "Access-Control-Allow-Origin", "*" );
        }



        function handleRequest( _request: Http.IncomingMessage, _response: Http.ServerResponse ): void {

            let query: Object = Url.parse( _request.url, true ).query;
            console.log( query["command"] );

            if ( query["command"] ) {
                switch ( query["command"] ) {

                    case "insert":
                        insert( query, _response );
                        break;

                    case "refresh":
                        refresh( _response );
                        break;

                    case "search":
                        search( query, _response );
                        break;

                    default: error();
                }
            }

            _response.end();
        }

        function insert( query: Object, _response: Http.ServerResponse ): void {

            let object: Studi = JSON.parse( query["data"] );
            let _name: string = object.name;
            let _firstname: string = object.firstname;
            let matrikel: string = object.matrikel.toString();
            let _age: number = object.age;
            let _gender: boolean = object.gender;
            let _studiengang: string = object.studiengang;

            let studi: Studi;

            studi = {
                name: _name,
                firstname: _firstname,
                matrikel: parseInt( matrikel ),
                age: _age,
                gender: _gender,
                studiengang: _studiengang
            };

            studiHomoAssoc[matrikel] = studi;

            _response.write( "Data received" );
        }

        function refresh( _response: Http.ServerResponse ): void {
               console.log( studiHomoAssoc );

            for ( let matrikel in studiHomoAssoc ) {
                let studi: Studi = studiHomoAssoc[matrikel];
                let line: string = matrikel + ": ";
                line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + ", ";
                line += studi.gender ? "male" : "female";
                _response.write( line + "\n" );
            }
        }

        function search( query: Object, _response: Http.ServerResponse ): void {

            let studi: Studi = studiHomoAssoc[query["searchFor"]];
            if ( studi ) {
                let line: string = query["searchFor"] + ": ";
                line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + ", ";
                line += studi.gender ? "male" : "female";
                _response.write( line );
            } else {
                _response.write( "Not found" );
            }
        }

        function error(): void {
            alert( "Error" );
        }
    }
