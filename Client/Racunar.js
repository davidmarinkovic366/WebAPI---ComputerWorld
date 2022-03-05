export class Racunar {
    constructor(id, name, price, listaHardvera) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.listaHardvera = listaHardvera;

        this.containerMeni = null;
        this.containerData = null;
        this.containerResult = null;
    }

    metodaDodajRacunar() {
        
    }

    crtajMeni(cont, met, result) {

        // this.ocisti(cont);
        // this.ocisti(met);

        this.containerMeni = cont;
        this.containerData = met;
        this.containerResult = result;
        
        let pom;
        let listaDugmica = [];

        let kliknuto = function() {
            let pomocna = this.innerHTML;
            alert(pomocna);
        }

        pom = document.createElement("label");
        pom.innerHTML = "Izaberite metodu:";
        this.containerMeni.appendChild(pom);
        
        let listaImena = ["Dodaj racunar", "Dodaj komponentu", "Dodaj u prodavnicu", "Lista racunara", "About", "Change", "Remove hardware"];
        for(let i = 0; i < listaImena.length; i++) {
            pom = document.createElement("button");
            pom.innerHTML = listaImena[i];
            pom.classList.add("dugmeDrugiMeni");
            pom.onclick = kliknuto;
            listaDugmica.push(pom);
            this.containerMeni.appendChild(listaDugmica[i]);
        }

    }

    // ocisti(parent) {
    //     while(parent.firstChild) {
    //         parent.removeChild(parent.firstChild);
    //     }
    // }

}