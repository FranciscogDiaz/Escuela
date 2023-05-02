"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docente = void 0;
var uuid_1 = require("uuid");
var Docente = /** @class */ (function () {
    function Docente(nombre, apellido, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.idLegajo = (0, uuid_1.v4)().slice(0, 10);
        this.materias = [];
    }
    return Docente;
}());
exports.Docente = Docente;
