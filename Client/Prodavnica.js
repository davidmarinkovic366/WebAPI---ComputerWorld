import { Racunar } from "./Racunar.js";

export class Prodavnica {
    constructor(id, name, address, size, listaRacunara) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.size = size;
        this.listaRacunara = listaRacunara;

        this.containerData = null;
        this.containerMeni = null;
        this.containerResult = null;
    }

    // crtajDodajProdavnicu() {

    //     console.log("usli smo!");
        
    //     let listaKontrola = ["input", "input", "input"];
    //     let listaLabela = ["Ime prodavnice", "Adress", "Size"];
    //     let listaId = ["ime", "adresa", "shelfSize"];
    //     let pom;
    //     let pomKont = document.createElement("div");
    //     pomKont.className = "grupaLabelInput";

    //     for(let i = 0; i < listaKontrola.length; i++) {
    //         pomKont = document.createElement("div");

    //         pom = document.createElement("label");
    //         pom.innerHTML = listaLabela[i];
    //         pomKont.appendChild(pom);
        
    //         pom = document.createElement(listaKontrola[i]);
    //         pom.id = listaId[i];
    //         pomKont.appendChild(pom);

    //         this.containerData.appendChild(pomKont);
    //     }


    // }


    // crtajDodajProdavnicu() {
    //     console.log("usli smo!");

    //     this.ocisti(this.containerData);
                    
        // let listaKontrola = ["input", "input", "input"];
        // let listaLabela = ["Ime prodavnice:", "Adress:", "Size:"];
        // let listaId = ["ime", "adresa", "shelfSize"];
        // let tipovi = ["text", "text", "number"];
        // let pom;
        // let pomKont = document.createElement("div");
        // pomKont.className = "grupaLabelInput";

        // for(let i = 0; i < listaKontrola.length; i++) {
        //     pomKont = document.createElement("div");

        //     pom = document.createElement("label");
        //     pom.innerHTML = listaLabela[i];
        //     pomKont.appendChild(pom);
        
        //     pom = document.createElement("input");
        //     pom.id = listaId[i];
        //     pom.type = tipovi[i];
        //     pomKont.appendChild(pom);

        //     this.containerData.appendChild(pomKont);
        // }
        // pom = document.createElement("button");
        // pom.innerHTML = "Dodaj prodavnicu";
        // pom.className = "dugmeTreciMeni";
        // pom.onclick = (ev) => this.metodaDodajProdavnicuUBazu(document.getElementById('ime').value,
        //                                                       document.getElementById('adresa').value,
        //                                                       document.getElementById('shelfSize').value);
        // this.containerData.appendChild(pom);

    // }

    // metodaDodajProdavnicuUBazu(name, address, shelfSize) {
    //     console.log(`Ime: ${name} tip: ${typeof(name)}, adresa: ${address} tipa: ${typeof(address)}, size: ${shelfSize} tipa: ${typeof(shelfSize)}`);
    // }

    // crtajDodajRacunar() {
    //     console.log("Crtamo dodaj racunar u prodavnicu:");

    //     this.ocisti(this.containerData);

    //     let listaRacunara = [];
    //     let listaProdavnica = [];

    //     fetch("https://localhost:5001/ComputerStore/VratiSveRacunare").then(p =>{
    //         p.json().then(racunari => {
    //             racunari.forEach(racunar => {
    //                 let r = new Racunar(racunar.id, racunar.computerName, racunar.computerPrice, racunar.computerHardware);
    //                 listaRacunara.push(r);
    //             });
    //         })
    //     })

    //     fetch("https://localhost:5001/ComputerStore/VratiSveProdavnice").then(p => {
    //         p.json().then(prodavnice =>{
    //             prodavnice.forEach(prodavnica => {
    //                 let pr = new Prodavnica(prodavnica.storeID, prodavnica.storeName, prodavnica.storeAddress, prodavnica.shelfSize, prodavnica.storeComputer);
    //                 listaProdavnica.push(pr);
    //             });
    //         })
    //     })

    //     let pom;
    //     let opcije = [listaProdavnica, listaRacunara];
    //     let labeleImena = ["Prodavnica: ", "Racunar: "];
    //     let identifikatori = ["idProdavnica", "idRacunar"];
    //     for(let i = 0; i < labeleImena.count; i++) {
    //         let grupa = document.createElement("div");
    //         grupa.id = "grupaSelectElementAndLabel";

    //         pom = document.createElement("label");
    //         pom.innerHTML = labeleImena[i];
    //         grupa.appendChild(pom);

    //         let opadajucaLista = document.createElement("select");
    //         opadajucaLista.id = identifikatori[i];

    //         opcije[i].forEach(s => {
    //             pom = document.createElement("option");
    //             pom.value = s.storeName;
    //             pom.innerHTML = s.storeName;
    //             opadajucaLista.appendChild(pom);
    //         })

    //         grupa.appendChild(opadajucaLista);
    //         this.containerData.appendChild(grupa);
    //     }

    //     pom = document.createElement("button");
    //     pom.className = "dugmeTreciMeni";
    //     pom.innerHTML = "Dodaj racunar!";
    //     this.containerData.appendChild(pom);
        
    //     console.log("Zavrsili smo!");

    // }

    // crtajVratiSveProdavnice() {

    // }

    // crtajGdeKupiti() {

    // }

    // crtajMeni(cont, met, result) {
    //     this.containerData = met;
    //     this.containerMeni = cont;
    //     this.containerResult = result;

    //     let pom;
    //     let imena = ["Dodaj prodavnicu", "Dodaj racunar", "Prodavnice", "Gde kupiti?"];
    //     let listaMetoda = [this.crtajDodajProdavnicu(), this.crtajDodajRacunar(), this.crtajVratiSveProdavnice(), this.crtajGdeKupiti()];

    //     pom = document.createElement("label");
    //     pom.innerHTML = "Izaberite metodu:";
    //     this.containerMeni.appendChild(pom);

    //     let btnLista = [];
    //     for(let i = 0; i < imena.length; i++) {
    //         pom = document.createElement("button");
    //         pom.innerHTML = imena[i];
    //         pom.className = "dugmeDrugiMeni";
    //         pom.onclick = (ev) => listaMetoda[i];
    //         btnLista.push(pom);
    //         this.containerMeni.appendChild(btnLista[i]);
    //     }

    // }

    ocisti(parent) {
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

}