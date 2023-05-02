"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardar = exports.leer = exports.escribir = exports.check = void 0;
var fs_1 = require("fs");
function check(path) {
    if (fs_1.default.existsSync(path)) {
        return true;
    }
    else {
        console.log('no existe');
        return false;
    }
}
exports.check = check;
function escribir(data, path) {
    return fs_1.default.writeFileSync(path, JSON.stringify(data, null, 2));
}
exports.escribir = escribir;
function leer(path) {
    try {
        if (check(path)) {
            var result = JSON.parse(fs_1.default.readFileSync(path, "utf-8"));
            return result;
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.leer = leer;
function guardar(path, data) {
    if (check(path)) {
        var dataToSave = __spreadArray(__spreadArray([], leer(path), true), [data], false);
        return escribir(dataToSave, path);
    }
    else {
        console.log('creando...');
        return escribir([data], path);
    }
}
exports.guardar = guardar;
module.exports = { check: check, escribir: escribir, leer: leer, guardar: guardar };
