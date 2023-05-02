"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Materia = void 0;
var uuid_1 = require("uuid");
var Materia = /** @class */ (function () {
    function Materia(materia) {
        this.materia = materia;
        this.idmateria = (0, uuid_1.v4)().slice(0, 10);
    }
    return Materia;
}());
exports.Materia = Materia;
