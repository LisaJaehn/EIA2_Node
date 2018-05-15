var L06_Interfaces;
(function (L06_Interfaces) {
    window.addEventListener("load", init);
    let address = "https://eia2node257455.herokuapp.com/";
    function init(_event) {
        console.log("Init");
        //Enventlistener auf Button übergeben
        let insertButton = document.getElementById("insert");
        let searchButton = document.getElementById("search");
        let refreshButton = document.getElementById("refresh");
        let exampleButton = document.getElementById("exampleData");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refreshStudents);
        searchButton.addEventListener("click", search);
        exampleButton.addEventListener("click", exampleData);
    }
    function exampleData() {
        for (let i = 0; i < 3; i++) {
            let student = {
                name: "Nachname " + i,
                firstname: "Jeff" + i,
                matrikel: Math.floor(Math.random() * 222222),
                age: Math.floor(Math.random() * 22),
                gender: !!Math.round(Math.random()),
                studiengang: "OMB"
            };
            sendDataToHost("addStudent", student);
        }
    }
    //Funktion um Daten der Studenten zu speichern
    function insert(_event) {
        let inputs = document.getElementsByTagName("input");
        let genderButton = document.getElementById("male");
        let matrikel = inputs[2].value;
        let studi;
        //Interface übergeben
        studi = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt(matrikel),
            age: parseInt(inputs[3].value),
            gender: genderButton.checked,
            studiengang: document.getElementsByTagName("select").item(0).value,
        };
        console.log(studi);
        console.log(studi.age);
        console.log(studi["age"]);
        // Datensatz im assoziativen Array unter der Matrikelnummer speichern
        L06_Interfaces.studiHomoAssoc[matrikel] = studi;
        // nur um das auch noch zu zeigen...
        L06_Interfaces.studiSimpleArray.push(studi);
        sendDataToHost("addStudent", studi);
    }
    //Funktion Ausgabe der Information
    function refreshStudents(_event) {
        sendDataToHost("refreshStudents");
    }
    function refresh() {
        let output = document.getElementsByTagName("textarea")[1];
        output.value = "";
        // for-in-Schleife iteriert über die Schlüssel des assoziativen Arrays
        for (let matrikel in L06_Interfaces.studiHomoAssoc) {
            let studi = L06_Interfaces.studiHomoAssoc[matrikel];
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? "(M)" : "(F)";
            line += studi.studiengang + ": ";
            output.value += line + "\n";
        }
        // zusätzliche Konsolenausgaben zur Demonstration
        console.group("Simple Array");
        console.log(L06_Interfaces.studiSimpleArray);
        console.groupEnd();
        console.group("Associatives Array (Object)");
        console.log(L06_Interfaces.studiHomoAssoc);
        console.groupEnd();
    }
    //Funktion, um Studenten nach Matrikelnummer zu suchen
    //Funktion search aufstellen
    function search(_event) {
        //Auf erste Textarea zugreifen
        let output = document.getElementsByTagName("textarea")[0];
        output.value = "";
        //Zugriff auf Inputs
        let inputs = document.getElementsByTagName("input");
        //Matrikel wird aufgerufen durch den 6. Input
        let matrikel = inputs[6].value;
        //Matrikelnummer wird gespeichert
        let studi = L06_Interfaces.studiHomoAssoc[matrikel];
        if (studi) {
            //Übereinstimmung mit Student
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? ", (M)" : ", (F)";
            line += studi.studiengang + ": ";
            output.value += line + "\n";
        }
        else {
            alert("Es wurde kein Student gefunden, bitte versuchen sie es noch einmal.");
        }
    }
    function sendDataToHost(method, data = undefined) {
        console.log("Sending data to host..");
        let xhr = new XMLHttpRequest();
        let dataString = JSON.stringify(data);
        xhr.open("GET", address + method + "?method=" + method + "&data=" + encodeURIComponent(dataString), true);
        if (method == "addStudent") {
            xhr.onload = function () {
                console.log(xhr.responseText);
            };
        }
        else if (method == "refreshStudents") {
            xhr.onload = function () {
                console.log('Refreshing Students...');
                L06_Interfaces.studiHomoAssoc = JSON.parse(xhr.responseText);
                refresh();
            };
        }
        xhr.send();
    }
})(L06_Interfaces || (L06_Interfaces = {}));
//# sourceMappingURL=Aufgabe6.2.js.map