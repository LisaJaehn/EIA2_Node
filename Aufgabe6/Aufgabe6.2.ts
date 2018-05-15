namespace L06_Interfaces {
    window.addEventListener( "load", init );

    let address: string = "https://eia2node257455.herokuapp.com/";
    function init( _event: Event ): void {
        console.log( "Init" );

        //Enventlistener auf Button übergeben

        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById( "insert" );
        let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById( "search" );
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById( "refresh" );
        let exampleButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById( "exampleData" );
        insertButton.addEventListener( "click", insert );
        refreshButton.addEventListener( "click", refreshStudents );
        searchButton.addEventListener( "click", search );
        exampleButton.addEventListener( "click", exampleData )
    }


    function exampleData() {
        for (let i = 0; i < 3; i++) {
            let student: L06_Interfaces.Studi = {
                name: "Nachname " + i,
                firstname: "Jeff" + i,
                matrikel: Math.floor(Math.random() * 222222),
                age: Math.floor(Math.random() * 22),
                gender: !!Math.round(Math.random()),
                studiengang: "OMB"
            }
            sendDataToHost("addStudent", student)
        }
    }


    //Funktion um Daten der Studenten zu speichern

    function insert( _event: Event ): void {
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName( "input" );
        let genderButton: HTMLInputElement = <HTMLInputElement>document.getElementById( "male" );
        let matrikel: string = inputs[2].value;
        let studi: Studi;

        //Interface übergeben

        studi = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt( matrikel ),
            age: parseInt( inputs[3].value ),
            gender: genderButton.checked,
            studiengang: document.getElementsByTagName( "select" ).item( 0 ).value,
        };

        console.log( studi );
        console.log( studi.age );
        
        console.log( studi["age"] );

        // Datensatz im assoziativen Array unter der Matrikelnummer speichern
        studiHomoAssoc[matrikel] = studi;

        // nur um das auch noch zu zeigen...
        studiSimpleArray.push( studi );

        sendDataToHost("addStudent", studi);
    }



    //Funktion Ausgabe der Information

    function refreshStudents(_event: Event): void {
        sendDataToHost("refreshStudents");
    }

    function refresh(): void {

        let output: HTMLTextAreaElement = document.getElementsByTagName( "textarea" )[1];
        output.value = "";

        // for-in-Schleife iteriert über die Schlüssel des assoziativen Arrays
        for ( let matrikel in studiHomoAssoc ) {  // Besonderheit: Type-Annotation nicht erlaubt, ergibt sich aus der Interface-Definition
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? "(M)" : "(F)";
            line += studi.studiengang + ": ";
            output.value += line + "\n";
        }

        // zusätzliche Konsolenausgaben zur Demonstration
        console.group( "Simple Array" );
        console.log( studiSimpleArray );
        console.groupEnd();

        console.group( "Associatives Array (Object)" );
        console.log( studiHomoAssoc );
        console.groupEnd();
    }

    //Funktion, um Studenten nach Matrikelnummer zu suchen
    //Funktion search aufstellen
    function search( _event: Event ): void {


        //Auf erste Textarea zugreifen
        let output: HTMLTextAreaElement = document.getElementsByTagName( "textarea" )[0];

        output.value = "";

        //Zugriff auf Inputs
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName( "input" );

        //Matrikel wird aufgerufen durch den 6. Input
        let matrikel: string = inputs[6].value;

        //Matrikelnummer wird gespeichert
        let studi: Studi = studiHomoAssoc[matrikel];

        if ( studi ) {
            
            //Übereinstimmung mit Student
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? ", (M)" : ", (F)";
            line += studi.studiengang + ": ";
            output.value += line + "\n";
            
        //Keine Übereinstimmung mit Student
        } else {
            alert( "Es wurde kein Student gefunden, bitte versuchen sie es noch einmal." );
        }
    }

    function sendDataToHost(method: string, data: any = undefined) {
        console.log("Sending data to host..");
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        let dataString: string = JSON.stringify(data);

        xhr.open("GET", address + method + "?method=" + method + "&data=" + encodeURIComponent(dataString), true);

        if (method == "addStudent") {
            xhr.onload = function () {
                console.log(xhr.responseText)
            }
        }
        else if (method == "refreshStudents") {
            xhr.onload = function () {
                console.log('Refreshing Students...');
                studiHomoAssoc = JSON.parse(xhr.responseText);
                refresh();
            }
        }
        xhr.send();
    }
}