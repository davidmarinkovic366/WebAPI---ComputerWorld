import { Racunar } from "./Racunar.js";
import { Prodavnica } from "./Prodavnica.js";
import { Hardver } from "./Hardver.js";

export class Company {
    constructor(stores, computers, hardwares, types, container, containerData, result) {
        this.stores = stores;
        this.computers = computers;
        this.hardwares = hardwares;
        this.types = types;

        this.container = container;
        this.containerData = containerData;
        this.result = result;
    }

    drawStoresMeni() {

        console.log("Inside Company function: 'drawStoresMeni'!");

        this.clearDiv(this.container);

        let pom;
        let imena = ["Dodaj prodavnicu", "Dodaj racunar", "Prodavnice", "Gde kupiti?"];
        let listaMetoda = [this.crtajDodajProdavnicu, this.crtajDodajRacunar
                         , this.crtajVratiSveProdavnice, this.crtajGdeKupiti];

        pom = document.createElement("label");
        pom.innerHTML = "Izaberite metodu:";
        this.container.appendChild(pom);

        let btnLista = [];
        for(let i = 0; i < imena.length; i++) {
            pom = document.createElement("button");
            pom.innerHTML = imena[i];
            pom.className = "dugmeDrugiMeni";
            switch(i) {
                case 0:
                    pom.onclick = (ev) => this.crtajDodajProdavnicu();
                    break;
                case 1:
                    pom.onclick = (ev) => this.crtajDodajRacunar();
                    break;
                case 2: 
                    pom.onclick = (ev) => this.crtajVratiSveProdavnice();
                    break;
                case 3:
                    pom.onclick = (ev) => this.crtajGdeKupiti();
                    break;
                default:
                    break;
            }
            btnLista.push(pom);
            this.container.appendChild(btnLista[i]);
        }
        this.clearDiv(this.containerData);

    }

    crtajDodajProdavnicu() {
        this.clearDiv(this.containerData);
        this.clearDiv(this.result);
        console.log("Crtamo dodaj prodavnicu:");


        let listaKontrola = ["input", "input", "input"];
        let listaLabela = ["Ime prodavnice:", "Adress:", "Size:"];
        let listaId = ["ime", "adresa", "shelfSize"];
        let tipovi = ["text", "text", "number"];
        let pom;
        let pomKont = document.createElement("div");
        pomKont.className = "grupaLabelInput";

        for(let i = 0; i < listaKontrola.length; i++) {
            pomKont = document.createElement("div");

            pom = document.createElement("label");
            pom.innerHTML = listaLabela[i];
            pomKont.appendChild(pom);
            
            pom = document.createElement("input");
            pom.id = listaId[i];
            pom.type = tipovi[i];
            pomKont.appendChild(pom);
            
            this.containerData.appendChild(pomKont);
        }
        pom = document.createElement("button");
        pom.innerHTML = "Dodaj prodavnicu";
        pom.className = "dugmeTreciMeni";
        pom.onclick = (ev) => this.metodaDodajProdavnicuUBazu(document.getElementById('ime').value,
        document.getElementById('adresa').value,
        document.getElementById('shelfSize').value);
        this.containerData.appendChild(pom);
        //Zameni sa stvarnom metodom!
    }

    
    metodaDodajProdavnicuUBazu(name, address, shelfSize) {
        console.log(`Ime: ${name} tip: ${typeof(name)}, adresa: ${address} tipa: ${typeof(address)}, size: ${shelfSize} tipa: ${typeof(shelfSize)}`);
    }

    crtajDodajRacunar() {
        console.log("Crtamo dodaj racunar u prodavnicu:");
        this.clearDiv(this.containerData);
        this.clearDiv(this.result);


        let pom;
        let opcije = [this.stores, this.computers];
        console.log(this.stores);
        console.log(this.computers);

        let labeleImena = ["Prodavnica: ", "Racunar: "];
        let identifikatori = ["idProdavnica", "idRacunar"];
        let grupa1 = document.createElement("div");
        grupa1.className = "grupaLabelInput"
        let grupa2 = document.createElement("div");
        grupa2.className = "grupaLabelInput"

        let labela = document.createElement("label");
        labela.innerHTML = "Prodavnica: ";
        grupa1.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = "Racunar: ";
        grupa2.appendChild(labela);

        // this.containerData.appendChild(grupa1);
        // this.containerData.appendChild(grupa2);

        let lista = document.createElement("select");
        lista.className = "opadajucaLista";
        lista.id = "str";
        this.stores.forEach(s => {
            pom = document.createElement("option");
            pom.value = s.name;
            pom.text = s.name;
            lista.append(pom);
        })

        grupa1.appendChild(lista);

        lista = document.createElement("select");
        lista.className = "opadajucaLista";
        lista.id = "cmp";
        this.computers.forEach(s => {
            pom = document.createElement("option");
            pom.value = s.name;
            pom.text = s.name;
            lista.append(pom);
        })

        grupa2.appendChild(lista);

        this.containerData.appendChild(grupa1);
        this.containerData.appendChild(grupa2);

        // let grupa;
        
        // for(let i = 0; i < labeleImena.count; i++) {
        //     console.log("usli smo!");
        //     grupa = document.createElement("div");
        //     grupa.className = "grupaLabelInput";

        //     pom = document.createElement("label");
        //     pom.innerHTML = labeleImena[i];
        //     grupa.appendChild(pom);

        //     let lista = document.createElement("select");
        //     lista.class = "opadajucaLista";

        //     if(i == 0) {
        //         this.stores.forEach(s => {
        //             pom = document.createElement("option");
        //             pom.value = s.id;
        //             pom.text = s.name;
        //             lista.append(pom);
        //         })
        //     }
        //     else {
        //         this.computers.forEach(s => {
        //             pom = document.createElement("option");
        //             pom.value = s.id;
        //             pom.text = s.name;
        //             lista.append(pom);
        //         })
        //     }

        //     grupa.appendChild(lista);
        //     this.containerData.appendChild(grupa);
        // }
        // // this.containerData.appendChild(grupa);

        pom = document.createElement("button");
        pom.className = "dugmeTreciMeni";
        pom.innerHTML = "Dodaj racunar!";
        pom.onclick = (ev) => this.addComputerMethod(document.querySelector("#str").value,
                                                    document.querySelector("#cmp").value);
        this.containerData.appendChild(pom);
        
        console.log("Zavrsili smo!");
    }

    addComputerMethod(prva, druga) {
        console.log(`U prodavnicu: ${prva}, dodaj racunar: ${druga}`);
    }

    drawComputersMeni() {
        console.log("bezveze");
        this.clearDiv(this.container);

        let pom;
        let imena = ["Dodaj komponentu racunaru", "Dodaj racunar", "Prodavnice", "Gde kupiti?"];
        let listaMetoda = [this.crtajDodajProdavnicu, this.crtajDodajRacunar
                         , this.crtajVratiSveProdavnice, this.crtajGdeKupiti];

        pom = document.createElement("label");
        pom.innerHTML = "Izaberite metodu:";
        this.container.appendChild(pom);

        let btnLista = [];
        for(let i = 0; i < imena.length; i++) {
            pom = document.createElement("button");
            pom.innerHTML = imena[i];
            pom.className = "dugmeDrugiMeni";
            switch(i) {
                case 0:
                    pom.onclick = (ev) => this.crtajDodajProdavnicu();
                    break;
                case 1:
                    pom.onclick = (ev) => this.crtajDodajRacunar();
                    break;
                case 2: 
                    pom.onclick = (ev) => this.crtajVratiSveProdavnice();
                    break;
                case 3:
                    pom.onclick = (ev) => this.crtajGdeKupiti();
                    break;
                default:
                    break;
            }
            btnLista.push(pom);
            this.container.appendChild(btnLista[i]);
        }
        this.clearDiv(this.containerData);
    }

    crtajVratiSveProdavnice() {
        // console.log("Pozvana metoda sve prodavnice");
        this.clearDiv(this.containerData);
        this.clearDiv(this.result);

        let table = document.createElement("table");
        table.className = "tabelaRezultat";
        let head = table.createTHead();

        let listaTabela = ["Name", "Address", "Size"];
        listaTabela.forEach(s => {
            let th = document.createElement("th");
            th.className = "tabelaRezultatHead";
            let text = document.createTextNode(s);

            th.appendChild(text);
            head.appendChild(th);
        })

        this.stores.forEach(s => {
            let row = table.insertRow();
            let listaOpcija = [s.name, s.address, s.size];
            for (let key in listaOpcija) {
                let cell = row.insertCell();
                let text = document.createTextNode(listaOpcija[key]);
                cell.appendChild(text);
            }
        })

        this.result.appendChild(table);
    }

    crtajGdeKupiti() {
        console.log("Pozvana metoda gde kupiti?");
        this.clearDiv(this.containerData);
        this.clearDiv(this.result);
        
        let pom;
        let grupaOdabir;
        grupaOdabir = document.createElement("div");
        grupaOdabir.className = "grupaLabelInput";

        pom = document.createElement("label");
        pom.innerHTML = "Izaberite racunar: ";
        grupaOdabir.appendChild(pom);

        let lista;
        lista = document.createElement("select");
        lista.id = "cmp";
        this.computers.forEach(s => {
            pom = document.createElement("option");
            pom.value = s.name;
            pom.text = s.name;
            lista.append(pom);
        })
        grupaOdabir.appendChild(lista);
        this.containerData.appendChild(grupaOdabir);

        pom = document.createElement("button");
        pom.className = "dugmeTreciMeni";
        pom.innerHTML = "Pretrazi!";
        pom.onclick = (ev) => crtajGdeSveMozeDaSeKupiOvajRacunar(this.result);

        this.containerData.appendChild(pom);

        function crtajGdeSveMozeDaSeKupiOvajRacunar(rezultat) 
        {
            //Ne mozemo da pozovemo this.clearDiv zbog scope-a 
            while(rezultat.firstChild)
                rezultat.removeChild(rezultat.firstChild);

            let val = document.querySelector("#cmp").value;
            let computerStoresLista = [];
            console.log(val);
            fetch(`https://localhost:5001/ComputerStore/GdeMoguDaKupimOvajRacunar/${val}`).then(p => {
                p.json().then(stores => {
                    stores.forEach(store => {
                        computerStoresLista.push(store);
                        //Ovo sve ok radi, vraca i stampa ono sto treba!
                        // console.log(store.cena);
                        // console.log(store.adresa);
                        // console.log(store.prodavnica);
                    })
                })
            })
            // console.log(computerStoresLista);
            // Radi

            let table = document.createElement("table");
            table.className = "tabelaRezultat";
            let head = table.createTHead();

            let listaTabela = ["Name", "Address", "Size"];
            listaTabela.forEach(s => {
                let th = document.createElement("th");
                th.className = "tabelaRezultatHead";
                let text = document.createTextNode(s);

                th.appendChild(text);
                head.appendChild(th);
            })
            // console.log(computerStoresLista[1]);
            // Object.keys(computerStoresLista).forEach(prop => console.log(prop));
            console.log("dovde radi!");
            //Problem je izgleda kod async-a, moram negde drugde da ucitam 
            //rezultat ove metode!
            console.log(computerStoresLista.length);
            computerStoresLista.forEach(s => {
                console.log("usli smo!");
                let row = table.insertRow();
                let listaOpcija = [s.prodavnica, s.adresa, s.cena];
                console.log("dovde radi!");
                for (let key in listaOpcija) {
                    let cell = row.insertCell();
                    console.log(key);
                    let text = document.createTextNode(listaOpcija[key]);
                    cell.appendChild(text);
                }
            })
            console.log("Dodajemo podatke u tabelu");
            rezultat.appendChild(table);
        }
        console.log("zavrsili smoe!");
    }

    clearDiv(parent) {
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }



}