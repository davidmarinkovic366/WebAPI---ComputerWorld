import { Hardver } from "./Hardver.js";
import { Prodavnica } from "./Prodavnica.js";
import { Racunar } from "./Racunar.js";
import { Company } from "./Company.js";

let company = new Company();
company.computers = [];
company.hardwares = [];
company.stores = [];

//Ucitavamo podatke iz baze i popunjavamo objekat tipa Company
let listaHardvera = [];
fetch("https://localhost:5001/ComputerStore/VratiSavHardver")
    .then(p => {
        p.json().then(hardveri => {
            hardveri.forEach(hardver => {
                // console.log(hardver);
                let h = new Hardver(hardver.id, hardver.hardwareName, hardver.tipID, hardver.hardwareInfo, hardver.hardwarePrice);
                listaHardvera.push(h);
                company.hardwares.push(h);
            });
        })
    })
console.log(listaHardvera);

let listaRacunara = [];
fetch("https://localhost:5001/ComputerStore/VratiSveRacunare")
    .then(p => {
        p.json().then(racunari => {
            racunari.forEach(racunar => {
                let r = new Racunar(racunar.id, racunar.computerName, racunar.computerPrice, racunar.computerHardware);
                listaRacunara.push(r);
                company.computers.push(r);
            })
        })
    })
console.log(listaRacunara);

let listaProdavnica = [];
fetch("https://localhost:5001/ComputerStore/VratiSveProdavnice")
    .then(p => {
        p.json().then(prodavnice => {
            prodavnice.forEach(prodavnica => {
                // console.log(prodavnica);
                let pr = new Prodavnica(prodavnica.storeID, prodavnica.storeName, prodavnica.storeAddress, prodavnica.shelfSize, prodavnica.storeComputer);
                listaProdavnica.push(pr);
                company.stores.push(pr);
            })
        })
    })
console.log(listaProdavnica);

//Crtamo osnovni meni, onaj koji se ne menja i dodajemo ostale objekte
let kontejner = document.createElement("div");
kontejner.className = "kontejner";
document.body.appendChild(kontejner);

let glavna = document.createElement("div");
glavna.className = "glavniKontejner";
kontejner.appendChild(glavna);

let rezultati = document.createElement("div");
rezultati.className = "rezultati";
kontejner.appendChild(rezultati);
company.result = rezultati;


let meni = [];
let lista = ["prviMeni", "drugiMeni", "treciMeni"];
let listaMenija = [];   //Ne mogu posle da uhvatim objekat sa .getElementsByClassName
                        //jer ne vraca referencu na objekat nego nesto bezveze?

for(let i = 0; i < 3; i++) {
    meni[i] = document.createElement("div");
    meni[i].classList.add(lista[i]);
    meni[i].id = lista[i];
    // meni[i].classList.add("show");
    glavna.appendChild(meni[i]);
    listaMenija[i] = meni[i];
}
// getElementByClass("by_class")
company.container = listaMenija[1];
company.containerData = listaMenija[2];


let labela = document.createElement("label");
labela.innerHTML = "Izaberite opciju: ";
meni[0].appendChild(labela);

//Ovo iznad je crtanje prvog menija

let klik = function() {
    let pom = this.innerHTML;
    ocisti(meni[1]);
    ocisti(meni[2]);
    switch(pom) {
        case "Prodavnice":
            company.drawStoresMeni();
            break;
        case "Racunari":
            company.drawComputersMeni();
            break;
        case "Hardver":
            // stores.
            break;
        default:
            break;
    }
}
//Handler za rad sa dugmicima u prvom div-u

let dugme;
lista = ["Prodavnice", "Racunari", "Hardver", "Prikaz"]
for(let i = 0; i < 4; i++) {
    dugme = document.createElement("button");
    dugme.innerHTML = lista[i];
    dugme.classList.add("dugmePrviMeni");
    dugme.onclick = klik;
    meni[0].appendChild(dugme);
}
//Za dodavanje dugmica na prvi div

function ocisti(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
//Cisti sadrzaj div-a, odnosno brise sve elemente u njemu
