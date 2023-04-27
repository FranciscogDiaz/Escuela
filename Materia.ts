import { v4 as uuidv4 } from "uuid";

export class Materia {
    materia: string;
    idmateria: string;
    constructor(materia: string) {
        this.materia = materia;
        this.idmateria = uuidv4().slice(0, 10);
    }
}