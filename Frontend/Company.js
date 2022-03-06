import { Store } from "./Store.js";
import { Computer } from "./Computer.js";

export class Company {
    constructor(name, storeList, computerList, hardwareList) {
        this.name = name;
        this.storeList = storeList;
        this.computerList = computerList;
        this.hardwareList = hardwareList;
        this.container = null;
        this.inputContainer = null;
    }

    drawStoreMenu() {
        console.log(`Kliknuli ste dugme za prodavnicu!`);
        if(this.inputContainer != null)
            this.emptyContainer(this.inputContainer);
            
        
        if(this.container.childElementCount != 0) {
            // emptySecondContainer();
            this.container.style.background = "#70aca8";
        }
        else
            this.container.style.background = "#70aca8";
            
        //Crtanje u store meni;
    
        //Selectors
        const buttonClassList = ['store-method-add-btn', 'store-method-compAdd-btn', 'store-method-return-btn', 'store-method-showData-btn'];
        const names = ['Add store', 'Add computer to store', 'Show all stores', 'Show occupancy'];
        const imageList = ['<i class="fa-solid fa-plus"></i>', '<i class="fa-solid fa-laptop-medical"></i>', '<i class="fa-solid fa-magnifying-glass-location"></i>', '<i class="fa-solid fa-chart-pie"></i>']; 
    
    
        let buttonAddStore = document.createElement('button');
        let buttonAddComputerToStore = document.createElement('button');
        let buttonReturnAllStores = document.createElement('button');
        let buttonShowOccupience = document.createElement('button');
        
        //Za automatizaciju dodavanja atributa dugmicima
        let lista = [buttonAddStore, buttonAddComputerToStore, buttonReturnAllStores, buttonShowOccupience];
        
        //Dodavanje atributa dugmicima
        for(let i = 0; i < 4; i++) {
            lista[i].classList.add('button');
            lista[i].classList.add('store-method-btn');
            lista[i].innerHTML = names[i] + imageList[i];
        }

        console.log(lista);
    
        //Pravimo kontejner za dugmice/metode za prodavnicu
        const containerMethods = document.createElement('div');
        containerMethods.classList.add('method-container');
        for(let i = 0; i < lista.length; i++) {
            containerMethods.appendChild(lista[i]);
        }
        console.log("Lista dugmica: ");
        console.log(lista);
    
        this.container.appendChild(containerMethods);
        containerMethods.style.background = this.container.style.background;
    
        //Events
        buttonAddStore.addEventListener('click', addStoreMethod => {
            //Brisemo sve sto se naslo unutar body-ja osim menija za izbor metoda
            this.checkAndClear();

            //Kontejner za input podataka za dodavanje prodavnice
            let storeInputDiv = document.createElement('div');
            storeInputDiv.classList.add('input-container');

            this.inputContainer = storeInputDiv;

            this.container.appendChild(storeInputDiv);
    
            let labelData = ['Name: ', 'Address: ', 'Shelf size: '];
            let labelsList = [];
            for(let i = 0; i < 3; i++) {
                let label = document.createElement('label');
                label.classList.add('simple-label');
                label.innerHTML = labelData[i];
                labelsList.push(label);
            }
    
            let listaInputa = [];
            let vrste = ['text', 'text', 'number'];
            //Da bi mogli da grupisemo po dva elementa u flex-box u;
            for(let i = 0; i < 3; i++) {
                let smallDivContainer = document.createElement('div');
                smallDivContainer.classList.add('small-div-container');
                smallDivContainer.classList.add('small-div-blue');

                let inputElement = document.createElement('input');
                inputElement.type = vrste[i];
                inputElement.classList.add('input-element');

                listaInputa.push(inputElement);

                smallDivContainer.appendChild(labelsList[i]);
                smallDivContainer.appendChild(listaInputa[i]);

                storeInputDiv.appendChild(smallDivContainer);
            }

            let buttonSave = document.createElement('button');
            buttonSave.classList.add('button');
            buttonSave.classList.add('store-method-btn');
            buttonSave.innerHTML = 'Save' + '<i class="fa-solid fa-check-double"></i>';
            storeInputDiv.appendChild(buttonSave);

            buttonSave.addEventListener('click', saveStore => {
                console.log(`Prodavnica: ${listaInputa[0].value} na adresi: ${listaInputa[1].value} sa shelf-size: ${listaInputa[2].value} je dodata!`);
                listaInputa[0].value = "";
                listaInputa[1].value = "";
                listaInputa[2].value = null;
            });

        });

        buttonAddComputerToStore.addEventListener('click', addComputerToStoreMethod => {
            //Posto koristimo isti kontejner za input nekih korisnickih podataka, prvo moramo da prethodni obrisemo;
            this.checkAndClear();

            //Sam kontejner za input;
            let storeInputDiv = document.createElement('div');
            // storeInputDiv.classList.add('.store-input-container');
            storeInputDiv.classList.add('input-container');


            //Dodajemo kontejner u body;
            this.inputContainer = storeInputDiv;
            this.container.appendChild(storeInputDiv);

            //Kreiramo labele koje nam govore gde unosimo koje podatke;
            let secondLabelData = ['Computer: ', 'To store: '];
            let secondLabelList = [];
            for(let i = 0; i < secondLabelData.length; i++) {
                let label = document.createElement('label');
                label.classList.add('simple-label');
                label.innerHTML = secondLabelData[i];

                secondLabelList.push(label);
            }

            //Kreiramo same select liste i dodajemo ih u body, da ne bi duplirali kod, ovako je 
            //automatizovano dodavanje;
            let selectList = [];
            for(let i = 0; i < 2; i++) {
                let smallDivContainer = document.createElement('div');
                smallDivContainer.classList.add('small-div-container');
                smallDivContainer.classList.add('small-div-blue');
                
                let selectElement = document.createElement("select");
                selectElement.classList.add('select-list');

                smallDivContainer.appendChild(secondLabelList[i]);
                smallDivContainer.appendChild(selectElement);

                selectList.push(selectElement);
                storeInputDiv.appendChild(smallDivContainer);
            }

            //Dodajemo sve racunare koje ima ova kompanija u prvu select-list u;
            this.computerList.forEach(s => {
                let option = document.createElement('option');
                option.classList.add('option');
                option.text = s.name;
                option.value = s.id;
                selectList[0].appendChild(option);
            });

            //Dodajemo sve prodavnice koje 'drzi' ova kompanija u drugu select-list u;
            this.storeList.forEach(s => {
                let option = document.createElement('option');
                option.classList.add('option');
                option.text = s.name;
                option.value = s.id;
                selectList[1].appendChild(option);
            });

            //Kreiramo dugme koje ce da prosledi nase izabrane podatke iz select-list a u bazu podataka;
            let buttonSave = document.createElement('button');
            buttonSave.classList.add('button');
            buttonSave.classList.add('store-method-btn');
            buttonSave.innerHTML = 'Save' + '<i class="fa-solid fa-check-double"></i>';

            //Event za 'Save' dugme;
            buttonSave.addEventListener('click', saveData => {
                console.log(`Racunar: ${selectList[0].value}/${selectList[0].text} dodat u prodavnicu: ${selectList[1].value}/${selectList[1].text}!`);
            });

            //Dodajemo samo dugme u '.store-input-container' div u body-ju;
            storeInputDiv.appendChild(buttonSave);

        });

        buttonReturnAllStores.addEventListener('click', returnAllStoresMethod => {
            //Posto koristimo isti kontejner za input nekih korisnickih podataka, prvo moramo da prethodni obrisemo;
            this.checkAndClear();

            //Sam kontejner za input;
            let storeInputDiv = document.createElement('div');
            // storeInputDiv.classList.add('.store-table-container');
            storeInputDiv.classList.add('table-container');


            //Dodajemo kontejner u body;
            this.inputContainer = storeInputDiv;
            this.container.appendChild(storeInputDiv);

            let table = document.createElement('table');
            table.classList.add('table');
            table.classList.add('table-store');

            let listaTabela = ["Name", "Address", "Size"];
            listaTabela.forEach(s => {
                let th = document.createElement("th");
                th.classList.add('table-head');
                th.classList.add('table-head-store');
                let text = document.createTextNode(s);

                th.appendChild(text);
                table.appendChild(th);
            })

            this.storeList.forEach(s => {
                let row = table.insertRow();
                row.classList.add('table-row')
                row.classList.add('table-row-store');
                let listaOpcija = [s.name, s.address, s.size];
                for (let key in listaOpcija) {
                    let cell = row.insertCell();
                    cell.classList.add('table-cell');
                    let text = document.createTextNode(listaOpcija[key]);
                    cell.appendChild(text);
                }
            })

            storeInputDiv.appendChild(table);

        });

        buttonShowOccupience.addEventListener('click', showOccupience => {
            this.checkAndClear();

            let storeInputDiv = document.createElement('div');
            // storeInputDiv.classList.add('store-status-container');
            storeInputDiv.classList.add('status-container');
            storeInputDiv.classList.add('status-container-store');

            this.inputContainer = storeInputDiv;
            this.container.appendChild(storeInputDiv);

            fetch("https://localhost:5001/ComputerStore/VratiZauzetostSvihProdavnica")
            .then(p => {
                p.json().then(stores => {
                    stores.forEach(store => {

                        console.log(store);
                        
                        let smallDivContainer = document.createElement('div');
                        smallDivContainer.classList.add('data-show-div-container');

                        let nameLabel = document.createElement('label');
                        nameLabel.classList.add('data-show-label');
                        nameLabel.innerHTML = store.name;

                        let occupience = document.createElement('label');
                        occupience.classList.add('data-show-label');
                        occupience.innerHTML = `[${store.occupied} / ${store.shelfs}]`;

                        let smallerDivContainer = document.createElement('div');
                        smallerDivContainer.classList.add('smaller-div-container');

                        let occupied = document.createElement('div');
                        occupied.classList.add('occupied-status');
                        occupied.innerHTML = ' ';
                        occupied.style.width = `${(100 / store.shelfs) * store.occupied}%`

                        let shelfs = document.createElement('div');
                        shelfs.classList.add('shelfs-status');
                        shelfs.innerHTML = ' ';
                        shelfs.style.width = `${100}%`;
                        
                        smallerDivContainer.appendChild(occupied);
                        smallerDivContainer.appendChild(shelfs);

                        smallDivContainer.appendChild(nameLabel);
                        smallDivContainer.appendChild(smallerDivContainer);
                        smallDivContainer.appendChild(occupience);

                        storeInputDiv.appendChild(smallDivContainer);
                            
                    });
                })
            })
        });
    }

    drawComputerMenu() {
        //Selectros

        const nameList = ['Add computer', 'Add component', 'All computers', 'Where to buy?', 
                          'Computer specs?', 'Change price', 'Remove component'];
        const imageList = ['<i class="fa-solid fa-plus"></i>', '<i class="fa-solid fa-square-plus"></i>',
                           '<i class="fa-solid fa-list"></i>', '<i class="fa-solid fa-magnifying-glass-location"></i>', 
                           '<i class="fa-solid fa-puzzle-piece"></i>', '<i class="fa-solid fa-money-bill-1-wave"></i>',
                           '<i class="fa-solid fa-trash-can"></i>'];
        
        let buttonList = [];

        for(let i = 0; i < nameList.length; i++) {
            let button = document.createElement('button');
            button.classList.add('button');
            button.classList.add('computer-method-btn');
            button.innerHTML = nameList[i] + imageList[i];

            buttonList.push(button);
        }

        //Pravimo kontejner za dugmice/metode za prodavnicu
        const containerMethods = document.createElement('div');
        containerMethods.classList.add('method-container');
        for(let i = 0; i < buttonList.length; i++) {
            containerMethods.appendChild(buttonList[i]);
        }
        console.log("Lista dugmica: ");
        console.log(buttonList);
    
        this.container.appendChild(containerMethods);
        containerMethods.style.background = this.container.style.background;

        //Events

        //Add Computer to Company (database)
        //Arguments: computerName
        buttonList[0].addEventListener('click', () => {
            console.log('Kliknuli ste da dodate racunar u bazu podataka');

            //Cistimo sta god da se naslo ovde u medjuvremenu;
            this.checkAndClear();

            let computerInputDiv = document.createElement('div');
            computerInputDiv.classList.add('input-container');

            this.inputContainer = computerInputDiv;
            this.container.appendChild(computerInputDiv);

            let smallDivContainer = document.createElement('div');
            smallDivContainer.classList.add('small-div-container');
            smallDivContainer.classList.add('small-div-lightgreen');

            let label = document.createElement('label');
            label.classList.add('simple-label');
            label.innerHTML = 'Computer name:';

            let input = document.createElement('input');
            input.type = 'text';
            input.classList.add('input-element');

            smallDivContainer.appendChild(label);
            smallDivContainer.appendChild(input);

            let button = document.createElement('button');
            button.classList.add('button');
            button.classList.add('computer-method-btn');
            button.innerHTML = 'Save' + '<i class="fa-solid fa-check-double"></i>';

            button.addEventListener('click', () => {
                //Zameni sa fetch/update
                // let comp = new Computer();
                // comp.name = input.text;
                // Dodaj tek kad budes spreman da menjas bazu iz js-a;
                // this.computerList.push(comp);

                console.log(`Dodajemo u bazu racunar sa imenom: ${input.value}!`);
            });

            computerInputDiv.appendChild(smallDivContainer);
            computerInputDiv.appendChild(button);
        });

        //Add component to computer
        //Arguments: computerName, hardwareName
        buttonList[1].addEventListener('click', () => {
            console.log('Kliknuli ste da dodate komponentu racunaru');
            this.checkAndClear();

            let computerInputDiv = document.createElement('div');
            computerInputDiv.classList.add('input-container');

            this.inputContainer = computerInputDiv;
            this.container.appendChild(computerInputDiv);

            let labelNames = ['Computer:', 'Hardware:']
            let selectList = [];

            for(let i = 0; i < 2; i++) {
                //Kreiramo kontejner za select element i labelu
                let smallDivContainer = document.createElement('div');
                smallDivContainer.classList.add('small-div-container');
                smallDivContainer.classList.add('small-div-lightgreen');

                //Kreiramo labelu
                let label = document.createElement('label');
                label.innerHTML = labelNames[i];

                //Kreiramo select element
                let selectElement = document.createElement("select");
                selectElement.classList.add('select-list');

                //Obican selektor da bi mogo da pristupim van petlje
                selectList.push(selectElement);

                //Dodajemo elemetne u kontejner
                smallDivContainer.appendChild(label);
                smallDivContainer.appendChild(selectElement);

                computerInputDiv.appendChild(smallDivContainer);
            }

            //Dodajemo elemente listama za odabir
            this.computerList.forEach( s => {
                let option = document.createElement('option');
                option.classList.add('option');
                option.text = s.name;
                option.value = s.id;
                selectList[0].appendChild(option);
            });

            this.hardwareList.forEach( s => {
                let option = document.createElement('option');
                option.classList.add('option');
                option.text = s.name;
                option.value = s.id;
                selectList[1].appendChild(option);
            });

            let button = document.createElement('button');
            button.classList.add('button');
            button.classList.add('computer-method-btn');
            button.innerHTML = 'Save' + '<i class="fa-solid fa-check-double"></i>';

            button.addEventListener('click', () => {
                console.log(`Racunaru: ${this.computerList[selectList[0].selectedIndex].name} je dodata komponenta: ${this.hardwareList[selectList[1].selectedIndex].name}!`);
            });

            // computerInputDiv.appendChild(smallDivContainer);
            computerInputDiv.appendChild(button);

        });

        //Arguments: none
        buttonList[2].addEventListener('click', () => {
            console.log('Kliknuli ste da vratite sve racunare iz baze podataka');
            this.checkAndClear();

            let computerInputDiv = document.createElement('div');
            computerInputDiv.classList.add('table-container');

            //Dodajemo kontejner u body;
            this.inputContainer = computerInputDiv;
            this.container.appendChild(computerInputDiv);

            let table = document.createElement('table');
            table.classList.add('table');
            table.classList.add('table-computer');

            let listaTabela = ["Name", "Price [RSD]"];
            listaTabela.forEach(s => {
                let th = document.createElement("th");
                th.classList.add('table-head');
                th.classList.add('table-head-computer');
                let text = document.createTextNode(s);

                th.appendChild(text);
                table.appendChild(th);
            })

            this.computerList.forEach(s => {
                let row = table.insertRow();
                row.classList.add('table-row')
                row.classList.add('table-row-computer');
                let listaOpcija = [s.name, s.price];
                for (let key in listaOpcija) {
                    let cell = row.insertCell();
                    cell.classList.add('table-cell');
                    let text = document.createTextNode(listaOpcija[key]);
                    cell.appendChild(text);
                }
            })

            computerInputDiv.appendChild(table);

        });

        //Arguments: computerName
        buttonList[3].addEventListener('click', () => {
            console.log('Kliknuli ste gde da kupite ovaj racunar');
            this.checkAndClear();
            // this.checkForSuper();

            let superContainer = document.createElement('div');
            // superContainer.classList.add('method-container');   //Koristimo method-container kako bi se automatski obrisala prilikom poziva checkAndClear()? 
            superContainer.classList.add('method-container-super');

            let computerInputDiv = document.createElement('div');
            computerInputDiv.classList.add('input-container-computer');

            this.inputContainer = superContainer;
            this.container.appendChild(superContainer);

            superContainer.appendChild(computerInputDiv);

            //Kreiramo kontejner za labelu i select listu
            let smallDivContainer = document.createElement('div');
            smallDivContainer.classList.add('small-div-container');
            smallDivContainer.classList.add('small-div-lightgreen');

            let label = document.createElement('label');
            label.classList.add('simple-label');
            label.innerHTML = 'Computer:';

            let selectElement = document.createElement('select');
            selectElement.classList.add('select-list');

            //Dodajemo opcije u select listu
            this.computerList.forEach( s => {
                let option = document.createElement('option');
                option.text = s.name;
                option.value = s.id;
                selectElement.appendChild(option);
            });

            smallDivContainer.appendChild(label);
            smallDivContainer.appendChild(selectElement);

            computerInputDiv.appendChild(smallDivContainer);

            let button = document.createElement('button');
            button.classList.add('button');
            button.classList.add('computer-method-btn');
            button.innerHTML = 'Check' + '<i class="fa-solid fa-circle-question"></i>';

            button.addEventListener('click', () => {

                if(document.querySelector('.table-computer') != null) {
                    this.emptyContainer(document.querySelector('.table-computer'));
                    this.inputContainer.removeChild(document.querySelector('.table-computer'));
                }

                let resultList = [];

                //Problem je stoje async, ne moze tako koliko vidim, mora da bude odmah odgovor!
                //Sve ostalo mi se cini da radi super
                fetch(`https://localhost:5001/ComputerStore/GdeMoguDaKupimOvajRacunar/${this.computerList[selectElement.selectedIndex].name}`)
                .then(p => {
                    p.json().then(computers => {
                        computers.forEach(computer => {
                            console.log(computer);
                            resultList.push(computer);
                        });

                        let table = document.createElement('table');
                        table.classList.add('table');
                        table.classList.add('table-computer');

                        console.log('ovde smo!');

                        let listaTabela = ["Store", "Address"];
                        listaTabela.forEach(s => {
                            let th = document.createElement("th");
                            th.classList.add('table-head');
                            th.classList.add('table-head-computer');
                            let text = document.createTextNode(s);

                            th.appendChild(text);
                            table.appendChild(th);
                        })

                        console.log(resultList.length);

                        resultList.forEach(s => {
                            let row = table.insertRow();
                            row.classList.add('table-row')
                            row.classList.add('table-row-computer');
                            let listaOpcija = [s.prodavnica, s.adresa];
                            for (let key in listaOpcija) {
                                let cell = row.insertCell();
                                cell.classList.add('table-cell');
                                let text = document.createTextNode(listaOpcija[key]);
                                cell.appendChild(text);
                            }
                        })

                        console.log('ovde smo!');

                        superContainer.appendChild(table);
                    })
                })

                console.log(resultList);

                // let table = document.createElement('table');
                // table.classList.add('table');
                // table.classList.add('table-computer');

                // console.log('ovde smo!');

                // let listaTabela = ["Store", "Address"];
                // listaTabela.forEach(s => {
                //     let th = document.createElement("th");
                //     th.classList.add('table-head');
                //     th.classList.add('table-head-computer');
                //     let text = document.createTextNode(s);

                //     th.appendChild(text);
                //     table.appendChild(th);
                // })

                // console.log(resultList.length);

                // resultList.forEach(s => {
                //     let row = table.insertRow();
                //     row.classList.add('table-row')
                //     row.classList.add('table-row-computer');
                //     let listaOpcija = [s.prodavnica, s.adresa];
                //     for (let key in listaOpcija) {
                //         let cell = row.insertCell();
                //         cell.classList.add('table-cell');
                //         let text = document.createTextNode(listaOpcija[key]);
                //         cell.appendChild(text);
                //     }
                // })

                // console.log('ovde smo!');

                // superContainer.appendChild(table);

            });

            // computerInputDiv.appendChild(smallDivContainer);
            computerInputDiv.appendChild(button);

        });

        //Arguments: computerName
        buttonList[4].addEventListener('click', () => {
            console.log('Kliknuli ste da vratite sav hardver ovog racunara');
            this.checkAndClear();

            let superContainer = document.createElement('div');
            // superContainer.classList.add('method-container');   //Koristimo method-container kako bi se automatski obrisala prilikom poziva checkAndClear()? 
            superContainer.classList.add('method-container-super');

            let computerInputDiv = document.createElement('div');
            computerInputDiv.classList.add('input-container-computer');

            this.inputContainer = superContainer;
            this.container.appendChild(superContainer);

            superContainer.appendChild(computerInputDiv);

            let smallDivContainer = document.createElement('div');
            smallDivContainer.classList.add('small-div-container');
            smallDivContainer.classList.add('small-div-lightgreen');

            let label = document.createElement('label');
            label.classList.add('simple-label');
            label.innerHTML = 'Computer:';

            let selectElement = document.createElement('select');
            selectElement.classList.add('select-list');

            //Dodajemo opcije u select listu
            this.computerList.forEach( s => {
                let option = document.createElement('option');
                option.text = s.name;
                option.value = s.id;
                selectElement.appendChild(option);
            });

            smallDivContainer.appendChild(label);
            smallDivContainer.appendChild(selectElement);

            computerInputDiv.appendChild(smallDivContainer);

            let button = document.createElement('button');
            button.classList.add('button');
            button.classList.add('computer-method-btn');
            button.innerHTML = 'Check ' + '<i class="fa-solid fa-circle-question"></i>';

            computerInputDiv.appendChild(button);

            superContainer.appendChild(computerInputDiv);

            button.addEventListener('click', () => {

                if(document.querySelector('.table-computer') != null) {
                    this.emptyContainer(document.querySelector('.table-computer'));
                    this.inputContainer.removeChild(document.querySelector('.table-computer'));
                }

                let hardwareList = [];

                fetch(`https://localhost:5001/ComputerStore/KojiJeHardverOvogRacunara/${this.computerList[selectElement.selectedIndex].name}`)
                .then(p => {
                    p.json().then(computer => {
                        computer.forEach(hardware => {
                            console.log(hardware);
                            hardwareList.push(hardware);
                            // console.log(computer);
                        });
                        let table = document.createElement('table');
                        table.classList.add('table');
                        table.classList.add('table-computer');

                        let listaTabela = ["Component", "Type", "Price"];
                        listaTabela.forEach(s => {
                            let th = document.createElement("th");
                            th.classList.add('table-head');
                            th.classList.add('table-head-computer');
                            let text = document.createTextNode(s);

                            th.appendChild(text);
                            table.appendChild(th);
                        })

                        console.log(hardwareList.length);

                        hardwareList.forEach(s => {
                            let row = table.insertRow();
                            row.classList.add('table-row')
                            row.classList.add('table-row-computer');
                            let listaOpcija = [s.nazivKomponente, s.tipKomponente, s.cenaKomopnente];
                            for (let key in listaOpcija) {
                                let cell = row.insertCell();
                                cell.classList.add('table-cell');
                                let text = document.createTextNode(listaOpcija[key]);
                                cell.appendChild(text);
                            }
                        })
                        // console.log('ovde smo!');

                        superContainer.appendChild(table);

                    })
                })

                // let table = document.createElement('table');
                // table.classList.add('table');
                // table.classList.add('table-computer');

                // let listaTabela = ["Component", "Type", "Price"];
                // listaTabela.forEach(s => {
                //     let th = document.createElement("th");
                //     th.classList.add('table-head');
                //     th.classList.add('table-head-computer');
                //     let text = document.createTextNode(s);

                //     th.appendChild(text);
                //     table.appendChild(th);
                // })

                // console.log(hardwareList.length);

                // hardwareList.forEach(s => {
                //     let row = table.insertRow();
                //     row.classList.add('table-row')
                //     row.classList.add('table-row-computer');
                //     let listaOpcija = [s.nazivKomponente, s.tipKomponente, s.cenaKomponente];
                //     for (let key in listaOpcija) {
                //         let cell = row.insertCell();
                //         cell.classList.add('table-cell');
                //         let text = document.createTextNode(listaOpcija[key]);
                //         cell.appendChild(text);
                //     }
                // })
                // // console.log('ovde smo!');

                // superContainer.appendChild(table);
            });
        });

        //Arguments: computerName, newPrice
        buttonList[5].addEventListener('click', () => {
            console.log('Kliknuli ste da promenite cenu ovog racunara');
            this.checkAndClear();

            let computerInputDiv = document.createElement('div');
            computerInputDiv.classList.add('input-container');

            this.inputContainer = computerInputDiv;
            this.container.appendChild(computerInputDiv);

            let smallDivContainer = document.createElement('div');
            smallDivContainer.classList.add('small-div-container');
            smallDivContainer.classList.add('small-div-lightgreen');

            let label = document.createElement('label');
            label.classList.add('simple-label');
            label.innerHTML = 'Computer:';

            let selectElement = document.createElement('select');
            selectElement.classList.add('select-list');

            //Dodajemo opcije u select listu
            this.computerList.forEach( s => {
                let option = document.createElement('option');
                option.text = s.name;
                option.value = s.id;
                selectElement.appendChild(option);
            });

            smallDivContainer.appendChild(label);
            smallDivContainer.appendChild(selectElement);

            computerInputDiv.appendChild(smallDivContainer);

            let button = document.createElement('button');
            button.classList.add('button');
            button.classList.add('computer-method-btn');
            button.innerHTML = 'Check ' + '<i class="fa-solid fa-circle-question"></i>';

            computerInputDiv.appendChild(button);

            button.addEventListener('click', () => {

                //Ne brise se sve, da ne bi pisao jos jednu funkciju samo za to
                //vidi nekako da ih na pocetku proveris i odmah i obrises ako postoje,
                //ako ne, ne radi nista sa brisanjem!
                //P.S. - Sve ostalo radi koliko vidim, mozes sliku za 'coin' da promenis, 
                //a moze i bez toga, sta me briga; 
                let list = [];
                if(list = document.querySelectorAll('.for-removing') != null) {
                    console.log(list.length);
                }

                let container = document.createElement('div');
                container.classList.add('small-div-container');
                container.classList.add('small-div-lightgreen');
                container.classList.add('for-removing');

                let secondLabel = document.createElement('label');
                secondLabel.classList.add('simple-label');
                secondLabel.classList.add('simple-label-wide');
                secondLabel.innerHTML = `Old price: ${this.computerList[selectElement.selectedIndex].price} RSD  ` + `<i class="fa-solid fa-coin-front"></i>`;

                container.appendChild(secondLabel);
                computerInputDiv.appendChild(container);

                container = null;
                secondLabel = null;

                container = document.createElement('div');
                container.classList.add('small-div-container');
                container.classList.add('small-div-lightgreen');
                container.classList.add('for-removing');

                secondLabel = document.createElement('label');
                secondLabel.classList.add('simple-label');
                secondLabel.innerHTML = 'New price:';

                let inputElement = document.createElement('input');
                inputElement.classList.add('input-store');
                inputElement.type = 'number';

                container.appendChild(secondLabel);
                container.appendChild(inputElement);

                computerInputDiv.appendChild(container);

                let secondButton = document.createElement('button');
                secondButton.classList.add('button');
                secondButton.classList.add('computer-method-btn');
                secondButton.classList.add('for-removing');
                secondButton.innerHTML = 'Change ' + '<i class="fa-solid fa-circle-check"></i>';

                computerInputDiv.appendChild(secondButton);

                secondButton.addEventListener('click', () => {
                    console.log(`Nova cena je: ${inputElement.value} RSD!`);
                    // this.computerList[selectElement.selectedIndex].price = inputElement.value;
                });
            });

        });

        //Arguments: computerName, hardwareName
        buttonList[6].addEventListener('click', () => {
            console.log('Kliknuli ste da obrisete komponentu iz racunara');
        });
    }

    //Za brisanje menija za izabor metoda
    emptySecondContainer() {
        if(document.querySelector('.second-container') != null) {
            let child = this.container.lastElementChild; 
            while (child) {
                this.container.removeChild(child);
                child = this.container.lastElementChild;
            }
        }
    }

    //Za brisanje svih deteta koji se nalaze u prosledjenom kontejneru
    emptyContainer(thisContainer) {
        let child = thisContainer.lastElementChild;
        while(child) {
            thisContainer.removeChild(child);
            child = thisContainer.lastElementChild;
        }
        thisContainer.remove;
    }

    //Metoda za ciscenje input-a ili tabele ukoliko postoji
    checkAndClear() {
        //Posto koristimo isti kontejner za input nekih korisnickih podataka, prvo moramo da prethodni obrisemo;
        if(document.querySelector('.input-container') != null) {
            this.emptyContainer(document.querySelector('.input-container'));
            this.container.removeChild(document.querySelector('.input-container'));
            this.inputContainer = null;
        }
        else {
            if(this.inputContainer != null) {
                this.emptyContainer(this.inputContainer);
                this.inputContainer.remove();
                this.inputContainer = null;
            }
        }

        if(document.querySelector('.store-table-container') != null) {
            this.emptyContainer(document.querySelector('.store-table-container'));
            this.container.removeChild(document.querySelector('.store-table-container'));
            this.inputContainer = null;
        } 
        else {
            if(this.inputContainer != null) {
                this.emptyContainer(this.inputContainer);
                this.inputContainer.remove();
                this.inputContainer = null;
            }
        }

        if(document.querySelector('.status-container') != null) {
            this.emptyContainer(document.querySelector('.status-container'));
            this.container.removeChild(document.querySelector('.status-container'));
            this.inputContainer = null;
        } 
        else {
            if(this.inputContainer != null) {
                this.emptyContainer(this.inputContainer);
                this.inputContainer.remove();
                this.inputContainer = null;
            }
        }
    }
}
