"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alumno = void 0;
var uuid_1 = require("uuid");
var Alumno = /** @class */ (function () {
    function Alumno(nombre, apellido, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.idLegajo = (0, uuid_1.v4)().slice(0, 10);
        this.materias = [];
        this.notas = [];
        this.promedio = 0;
    }
    return Alumno;
}());
exports.Alumno = Alumno;
