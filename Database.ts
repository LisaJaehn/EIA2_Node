import * as Mongo from "mongodb";
console.log( "Database starting" );

let databaseURL: string = "mongodb://localhost:27017";
let databaseName: string = "Test";
let db: Mongo.Db;
let students: Mongo.Collection;


if ( process.env.NODE_ENV == "production" ) {
    databaseURL = "mongodb://Testuser:testpasswort1@ds253959.mlab.com:53959/database_mongodb";
    databaseName = "database_mongo";
}

Mongo.MongoClient.connect( databaseURL, handleConnect );

function handleConnect( _e: Mongo.MongoError, _db: Mongo.Db ): void {
    if ( _e )
        console.log( "Unable to connect to database, error: ", _e );
    else {
        console.log( "Connected to database!" );
        db = _db.db( databaseName );
        students = db.collection( "students" );
    }
}

export function insert( _doc: Studi ): void {
    students.insertOne( _doc, handleInsert );
}

function handleInsert( _e: Mongo.MongoError ): void {
    console.log( "Database insertion returned -> " + _e );
}


export function findAll( _callback: Function ): void {
    var cursor: Mongo.Cursor = students.find();
    cursor.toArray( prepareAnswer );

    function prepareAnswer( _e: Mongo.MongoError, studentArray: Studi[] ): void {
        if ( _e )
            _callback( "Error" + _e );
        else
            _callback( JSON.stringify( studentArray ) );
    }
}