import { Store } from "./Store.js";
import { Computer } from "./Computer.js";
import { Hardware } from "./Hardware.js";
import { Company } from "./Company.js";

//////////<Fetch naredbe>
let storeList = [];
fetch("https://localhost:5001/ComputerStore/VratiSveProdavnice")
    .then(p => {
        p.json().then(prodavnice => {
            prodavnice.forEach(prodavnica => {
                // console.log(prodavnica);
                let pr = new Store(prodavnica.storeID, prodavnica.storeName, prodavnica.storeAddress, prodavnica.shelfSize, prodavnica.storeComputer);
                storeList.push(pr);
            })
        })
    })
console.log("Lista prodavnica: ");
console.log(storeList);

let computerList = [];
fetch("https://localhost:5001/ComputerStore/VratiSveRacunare")
    .then(p => {
        p.json().then(racunari => {
            racunari.forEach(racunar => {
                let r = new Computer(racunar.id, racunar.computerName, racunar.computerPrice, racunar.computerHardware);
                computerList.push(r);
            })
        })
    });
console.log("Lista racunara: ");
console.log(computerList);

let hardwareList = [];
fetch("https://localhost:5001/ComputerStore/VratiSavHardver")
    .then(p => {
        p.json().then(hardveri => {
            hardveri.forEach(hardver => {
                let h = new Hardware(hardver.id, hardver.hardwareName, hardver.tipID, hardver.hardwareInfo, hardver.hardwarePrice);
                hardwareList.push(h);
            });
        })
    })
console.log("Lista hardvera: ");
console.log(hardwareList);

//////////</Fetch naredbe>

//////////Selectors

//Hvatanje glavnog kontejnera
const mainContainer = document.querySelector('.main-container');
console.log(mainContainer.classList);

//////<Body>
let company = new Company('Gigatron', storeList, computerList, hardwareList);
// console.log(company);

//////<Glavni meni>

//Kreiranje glavnog navigaconog menija, onog koji je konstantan
const menuContainer = document.createElement('div');
menuContainer.classList.add('menu-container');

//Podaci potrebni za automatizovanje dodatih elemenata
const listaDugmica = ['Store', 'store-btn', 'Computers', 'computers-btn', 'Hardware', 'hardware-btn'];
const icons = ['<i class="fa-solid fa-store"></i>', '<i class="fa-solid fa-laptop"></i>', '<i class="fa-solid fa-microchip"></i>'];
let j = 0;
//Dodavanje dugmica i njima odgovarajucih atributa
for(let i = 0; i < listaDugmica.length; i = i+2) {
    const button = document.createElement('button');
    button.innerHTML = listaDugmica[i] + icons[j];
    j++;
    button.classList.add(listaDugmica[i+1]);

    menuContainer.appendChild(button);
}

//Dodavanje glavnog menija na stranicu
mainContainer.appendChild(menuContainer);
//////</Glavni meni>

//Kontejner za stampanje svega, dugmica drugih metoda, rezultata...
const secondContainer = document.createElement('div');
secondContainer.classList.add('second-container');

mainContainer.appendChild(secondContainer);
//////</Body>


//////////Event Listeneres

//<Navigation panell events>
let button = document.querySelector('.store-btn');
button.addEventListener('click', storeMenu);

button = document.querySelector('.computers-btn');
button.addEventListener('click', computerMenu);

button = document.querySelector('.hardware-btn');
button.addEventListener('click', hardwareMenu);
//</Navigation panell events>

//<Store menu events>


//////////Functions
function storeMenu() {
    if(secondContainer.childElementCount != 0) {
        emptySecondContainer();
        secondContainer.style.background = "#70aca8"; 
    }
    else
        secondContainer.style.background = "#70aca8";
    company.container = secondContainer;
    company.drawStoreMenu();
}

function computerMenu(event) {
    console.log(`Kliknuli ste dugme za racunare!`);
    if(secondContainer.childElementCount != 0) {
        emptySecondContainer();
        secondContainer.style.background = "#017f71"; 
    }
    else
        secondContainer.style.background = "#017f71";

    company.container = secondContainer;
    company.drawComputerMenu();

}

function hardwareMenu(event) {
    console.log(`Kliknuli ste dugme za hardver!`);
    if(secondContainer.childElementCount != 0) {
        emptySecondContainer();
        secondContainer.style.background = "#917c9b"; 
    }
    else
        secondContainer.style.background = "#917c9b";

    company.container = secondContainer;
    // To-do
    // company.drawHardwareMenu();

}

function emptySecondContainer() {
    if(document.querySelector('.second-container') != null) {
        let child = secondContainer.lastElementChild; 
        while (child) {
            secondContainer.removeChild(child);
            child = secondContainer.lastElementChild;
        }
    }
}