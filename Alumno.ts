import { Persona } from "./Ipersona";
import { Materia } from "./Materia";
import { v4 as uuidv4 } from "uuid";

export class Alumno implements Persona {
    nombre: string;
    apellido: string;
    dni: number;
    idLegajo: string;
    materias: Materia[];
    notas: number[];
    promedio:number;
    constructor(nombre: string, apellido: string, dni: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni
        this.idLegajo = uuidv4().slice(0, 10)
        this.materias = [];
        this.notas=[];
        this.promedio=0;
    }    
}