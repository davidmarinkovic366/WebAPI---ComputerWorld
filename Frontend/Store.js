// import { Computer } from "./Computer.js";

export class Store {
    constructor(id, name, address, size, computerList) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.size = size;
        this.computerList = computerList;

        this.container = null;
    }
}