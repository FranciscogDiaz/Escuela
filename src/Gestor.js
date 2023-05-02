"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gestion = void 0;
var Alumno_1 = require("./Alumno");
var Docente_1 = require("./Docente");
var Materia_1 = require("./Materia");
var util_1 = require("./util");
var fs_1 = require("fs");
var readline_sync_1 = require("readline-sync");
var Gestion = /** @class */ (function () {
    function Gestion() {
    }
    //Genera una nueva materia a dictar/cursar
    Gestion.crearMateria = function () {
        var nombreMateria = readline_sync_1.default.question("Ingrese el nombre de la materia a dictar: ");
        var newMateria = new Materia_1.Materia(nombreMateria);
        var pathMaterias = "./directoryData/materias.json";
        console.log(newMateria);
        (0, util_1.guardar)(pathMaterias, newMateria);
        return newMateria;
    };
    //Metodo para inscribir un nuevo alumno
    Gestion.crearMatricula = function () {
        var nombre = readline_sync_1.default.question("Ingrese el nombre: ");
        var apellido = readline_sync_1.default.question("Ingrese el apellido: ");
        var dni = Number(readline_sync_1.default.question("Ingrese el documento: "));
        var newAlumno = new Alumno_1.Alumno(nombre, apellido, dni);
        var pathAlumnos = "./directoryData/alumnos.json";
        (0, util_1.guardar)(pathAlumnos, newAlumno);
        console.log("Ha ingresado un nuevo Alumno al sistema, con los siguientes datos: \n");
        console.log(newAlumno);
        return newAlumno;
    };
    //Metodo para contratar un nuevo docente
    Gestion.crearContrato = function () {
        var nombre = readline_sync_1.default.question("Ingrese el nombre: ");
        var apellido = readline_sync_1.default.question("Ingrese el apellido: ");
        var dni = Number(readline_sync_1.default.question("Ingrese el documento: "));
        var newDocente = new Docente_1.Docente(nombre, apellido, dni);
        var pathDocentes = "./directoryData/docentes.json";
        (0, util_1.guardar)(pathDocentes, newDocente);
        console.log("Ha ingresado un nuevo Docente al sistema, con los siguientes datos: \n");
        console.log(newDocente);
        return newDocente;
    };
    //Este metodo asigna una o mas materias a cursar/dictar por un alumno/docente 
    Gestion.inscribirDictarMaterias = function () {
        var pathAlumnos = "./directoryData/alumnos.json";
        var pathDocente = "./directoryData/docentes.json";
        var pathMaterias = "./directoryData/materias.json";
        var listaAlumoModif = (0, util_1.leer)(pathAlumnos);
        var listaDocenteModif = (0, util_1.leer)(pathDocente);
        var listaMateriasModif = (0, util_1.leer)(pathMaterias);
        var busqueda = Number(readline_sync_1.default.question("Ingrese el DNI de la persona que desea asignar una o mas materias: "));
        var alumnoEncontrado = listaAlumoModif.findIndex(function (alumno) { return alumno.dni === busqueda; });
        var alumno = listaAlumoModif[alumnoEncontrado];
        var docenteEncontrado = listaDocenteModif.findIndex(function (docente) { return docente.dni === busqueda; });
        var docente = listaDocenteModif[docenteEncontrado];
        if (alumnoEncontrado >= 0) {
            console.log(alumno);
            console.log("Estas son las materias disponibles en la institucion: \n");
            listaMateriasModif.forEach(function (nombre) {
                console.log("Materia:... ", nombre.materia);
            });
            var eleccion_1 = readline_sync_1.default.question("Ingrese la materia que desea inscribirse: ");
            var ubicacionEleccion = listaMateriasModif.findIndex(function (nombre) { return nombre.materia.toLowerCase() === eleccion_1.toLowerCase(); });
            var verMateria = listaMateriasModif[ubicacionEleccion];
            if (ubicacionEleccion >= 0) {
                alumno.materias.push(verMateria.materia);
                console.log("El alumno se ha inscripto correctamente a la materia.- \n");
                console.log(alumno);
                fs_1.default.writeFileSync(pathAlumnos, JSON.stringify(listaAlumoModif, null, 2));
            }
            else {
                console.log("No ingreso una materia disponible, intente nuevamente");
            }
        }
        else if (docenteEncontrado >= 0) {
            console.log(docente);
            console.log("Estas son las materias disponibles en la institucion: \n");
            listaMateriasModif.forEach(function (nombre) {
                console.log("Materia: ", nombre.materia);
            });
            var eleccion_2 = readline_sync_1.default.question("Ingrese la materia que desea dictar: ");
            var ubicacionEleccion = listaMateriasModif.findIndex(function (nombre) { return nombre.materia.toLowerCase() === eleccion_2.toLowerCase(); });
            var verMateria = listaMateriasModif[ubicacionEleccion];
            if (ubicacionEleccion >= 0) {
                docente.materias.push(verMateria.materia);
                console.log("El docente se ha inscripto correctamente a la materia.- \n");
                console.log(docente);
                fs_1.default.writeFileSync(pathDocente, JSON.stringify(listaDocenteModif, null, 2));
            }
            else {
                console.log("No ingreso una materia disponible, intente nuevamente");
            }
        }
        else {
            console.log("El alumno/profesor no fue encontrado en el registro.-\n");
        }
    };
    //Modifica los datos ingresados con anterioridad de un docente/alumno
    Gestion.modificarDatos = function () {
        var pathDocentes = "./directoryData/docentes.json";
        var pathDocenteModif = (0, util_1.leer)(pathDocentes);
        var pathAlumnos = "./directoryData/alumnos.json";
        var pathAlumnoModif = (0, util_1.leer)(pathAlumnos);
        var busqueda = Number(readline_sync_1.default.question("Ingrese el DNI de la persona que desea modificar: "));
        var alumnoEncontrado = pathAlumnoModif.findIndex(function (alumno) { return alumno.dni === busqueda; });
        var docenteEncontrado = pathDocenteModif.findIndex(function (docente) { return docente.dni === busqueda; });
        if (alumnoEncontrado >= 0) {
            var alumno = pathAlumnoModif[alumnoEncontrado];
            console.log("El alumno buscado posee los siguientes datos: ", alumno);
            var opciones = ["Modificar Nombre", "Modificar Apellido", "Modificar DNI"];
            var eleccion = readline_sync_1.default.keyInSelect(opciones, "Que dato desea modificar?: ");
            var modificar = opciones[eleccion];
            switch (modificar) {
                case "Modificar Nombre":
                    var modifNombre = readline_sync_1.default.question("Ingrese el nombre del alumno para modificarlo: ");
                    pathAlumnoModif[alumnoEncontrado].nombre = modifNombre;
                    break;
                case "Modificar Apellido":
                    var modifApellido = readline_sync_1.default.question("Ingrese el apellido del alumno para modificarlo: ");
                    pathAlumnoModif[alumnoEncontrado].apellido = modifApellido;
                    break;
                case "Modificar DNI":
                    var modifDni = readline_sync_1.default.question("Ingrese el DNI del alumno para modificarlo: ");
                    pathAlumnoModif[alumnoEncontrado].dni = modifDni;
                    break;
                default:
                    console.log("Ha ingresado un valor equivocado, intente nuevamente");
                    break;
            }
            console.log("El alumno quedo modificado de la siguiente forma: \n");
            console.log(alumno);
            fs_1.default.writeFileSync(pathAlumnos, JSON.stringify(pathAlumnoModif, null, 2));
        }
        else if (docenteEncontrado >= 0) {
            var docente = pathDocenteModif[docenteEncontrado];
            console.log("El docente buscado posee los siguientes datos: ", docente);
            var opciones = ["Modificar Nombre", "Modificar Apellido", "Modificar DNI"];
            var eleccion = readline_sync_1.default.keyInSelect(opciones, "Que dato desea modificar?: ");
            var modificar = opciones[eleccion];
            switch (modificar) {
                case "Modificar Nombre":
                    var modifNombre = readline_sync_1.default.question("Ingrese el nombre del docente para modificarlo: ");
                    pathDocenteModif[docenteEncontrado].nombre = modifNombre;
                    break;
                case "Modificar Apellido":
                    var modifApellido = readline_sync_1.default.question("Ingrese el apellido del docente para modificarlo: ");
                    pathDocenteModif[docenteEncontrado].apellido = modifApellido;
                    break;
                case "Modificar DNI":
                    var modifDni = readline_sync_1.default.question("Ingrese el DNI del docente para modificarlo: ");
                    pathDocenteModif[docenteEncontrado].dni = modifDni;
                    break;
                default:
                    console.log("Ha ingresado un valor equivocado, intente nuevamente");
                    break;
            }
            console.log("El docente quedo modificado de la siguiente forma: \n");
            console.log(docente);
            fs_1.default.writeFileSync(pathDocentes, JSON.stringify(pathDocenteModif, null, 2));
        }
        else {
            console.log("No existe en el registro una persona con ese DNI");
        }
    };
    //Busca un alumno/docente que este inscripto en la institucion, de lo contrario envia un mensaje de que la persona no se encuentra registrada
    Gestion.busquedaPersona = function () {
        var pathDocentes = "./directoryData/docentes.json";
        var pathDocenteModif = (0, util_1.leer)(pathDocentes);
        var pathAlumnos = "./directoryData/alumnos.json";
        var pathAlumnoModif = (0, util_1.leer)(pathAlumnos);
        var busqueda = Number(readline_sync_1.default.question("Ingrese el DNI de la persona que desea modificar: "));
        var alumnoEncontrado = pathAlumnoModif.findIndex(function (alumno) { return alumno.dni === busqueda; });
        var docenteEncontrado = pathDocenteModif.findIndex(function (docente) { return docente.dni === busqueda; });
        if (alumnoEncontrado >= 0) {
            var datosAlumno = pathAlumnoModif[alumnoEncontrado];
            console.log("Alumno: \n");
            console.log(datosAlumno);
            return datosAlumno;
        }
        else if (docenteEncontrado >= 0) {
            var datosDocente = pathDocenteModif[docenteEncontrado];
            console.log("Docente: \n");
            console.log(datosDocente);
            return datosDocente;
        }
        else {
            console.log("No existe en el registro un alumno/profesor con ese DNI");
        }
    };
    //Despide o Expulsa un Docente/Alumno del registro
    Gestion.eliminarPersona = function () {
        var pathDocentes = "./directoryData/docentes.json";
        var pathDocenteModif = (0, util_1.leer)(pathDocentes);
        var pathAlumnos = "./directoryData/alumnos.json";
        var pathAlumnoModif = (0, util_1.leer)(pathAlumnos);
        var busqueda = Number(readline_sync_1.default.question("Ingrese el DNI de la persona que esta buscando eliminar: "));
        var alumnoEncontrado = pathAlumnoModif.findIndex(function (alumno) { return alumno.dni === busqueda; });
        var docenteEncontrado = pathDocenteModif.findIndex(function (docente) { return docente.dni === busqueda; });
        if (alumnoEncontrado >= 0) {
            var datosAlumno = pathAlumnoModif[alumnoEncontrado];
            console.log("Datos del alumno buscado: \n");
            console.log(datosAlumno);
            var respuesta = readline_sync_1.default.keyInYN("Esta seguro de eliminar el alumno del archivo? (Esta opcion no se puede deshacer).\n");
            if (respuesta) {
                pathAlumnoModif.splice(alumnoEncontrado, 1);
                (0, util_1.escribir)(pathAlumnoModif, pathAlumnos);
                console.log("El alumno fue eliminado del sistema");
            }
            else {
                console.log("no eliminaste a nadie");
            }
        }
        else if (docenteEncontrado >= 0) {
            var datosDocente = pathDocenteModif[docenteEncontrado];
            console.log("Datos del docente buscado: \n");
            console.log(datosDocente);
            var respuesta = readline_sync_1.default.keyInYN("Esta seguro de eliminar el docente del archivo? (Esta opcion no se puede deshacer).\n");
            if (respuesta) {
                pathDocenteModif.splice(datosDocente, 1);
                (0, util_1.escribir)(pathDocenteModif, pathDocentes);
                console.log("El docente fue eliminado del sistema");
            }
            else {
                console.log("no eliminaste a nadie");
            }
        }
        else {
            console.log("El alumno/profesor no fue eliminado del sistema");
        }
    };
    //Lista por pantalla los alumnos inscriptos
    Gestion.listadoAlumnos = function () {
        var pathAlumnos = "./directoryData/alumnos.json";
        var pathAlumnoModif = (0, util_1.leer)(pathAlumnos);
        console.log("Alumnos inscriptos en la institucion: \n");
        pathAlumnoModif.forEach(function (alumno) {
            console.log("Nombre y Apellido:...... ".concat(alumno.nombre, " ").concat(alumno.apellido));
            console.log("DNI:.................... ".concat(alumno.dni));
            console.log("ID de la institucion.... ".concat(alumno.idLegajo));
            console.log("Materias que cursa...... ".concat(alumno.materias, "\n"));
        });
    };
    //Lista por pantalla los docentes inscriptos
    Gestion.listadoDocentes = function () {
        var listadoDocentes = (0, util_1.leer)("./directoryData/docentes.json");
        console.log("Docentes inscriptos en la institucion: \n");
        listadoDocentes.forEach(function (docente) {
            console.log("Nombre y Apellido:...... ".concat(docente.nombre, " ").concat(docente.apellido));
            console.log("DNI:.................... ".concat(docente.dni));
            console.log("ID de la institucion.... ".concat(docente.idLegajo));
            console.log("Materias que dicta...... ".concat(docente.materias, "\n"));
        });
    };
    // listado de alumnos por docente
    Gestion.listadoAlumnosPorDocente = function () {
        var listDocAmodif = (0, util_1.leer)("./directoryData/docentes.json");
        var listAlumAmodif = (0, util_1.leer)("./directoryData/alumnos.json");
        var busqueda = Number(readline_sync_1.default.question("Ingrese el DNI del docente para ver los alumnos a cargo: "));
        var docenteEncontrado = listDocAmodif.find(function (docente) { return docente.dni === busqueda; });
        console.log("\n");
        if (docenteEncontrado) {
            console.log("Alumnos a cargo del docente ".concat(docenteEncontrado.nombre, " ").concat(docenteEncontrado.apellido, " que dicta ").concat(docenteEncontrado.materias, ":"));
            for (var i = 0; i < listAlumAmodif.length; i++) {
                var materias = listAlumAmodif[i].materias;
                var nombre = listAlumAmodif[i].nombre;
                var apellido = listAlumAmodif[i].apellido;
                for (var j = 0; j < materias.length; j++) {
                    if (materias[j] === docenteEncontrado.materias.toString()) {
                        console.log("  ".concat(nombre, " ").concat(apellido));
                    }
                }
            }
        }
        else {
            console.log("No se encontro docente con el DNI ingresado");
        }
    };
    //Lista los docentes que tiene un alumno
    Gestion.listadoDocentesPorAlumno = function () {
        var listDocAmodif = (0, util_1.leer)("./directoryData/docentes.json");
        var listAlumAmodif = (0, util_1.leer)("./directoryData/alumnos.json");
        var busqueda = Number(readline_sync_1.default.question("Ingrese el DNI del alumno para ver los docentes a cargo: "));
        var alumnoEncontrado = listAlumAmodif.find(function (alumno) { return alumno.dni === busqueda; });
        console.log("\n");
        if (alumnoEncontrado) {
            console.log("Docentes que tiene el alumno ".concat(alumnoEncontrado.nombre, " ").concat(alumnoEncontrado.apellido, " que cursa ").concat(alumnoEncontrado.materias, ":"));
            for (var i = 0; i < listDocAmodif.length; i++) {
                var materiasDocente = listDocAmodif[i].materias;
                if (materiasDocente.some(function (materia) { return alumnoEncontrado.materias.includes(materia); })) {
                    console.log("  ".concat(listDocAmodif[i].nombre, " ").concat(listDocAmodif[i].apellido));
                }
            }
        }
        else {
            console.log("No se encontro docente con el DNI ingresado");
        }
    };
    //Metodo para generar el promedio obtenido con las materias que cursa un alumno
    Gestion.listadoAlumnosConPromedios = function () {
        var listDocAmodif = (0, util_1.leer)("./directoryData/docentes.json");
        var listAlumAmodif = (0, util_1.leer)("./directoryData/alumnos.json");
        var busqueda = Number(readline_sync_1.default.question("Ingrese el DNI del docente para ver los alumnos a cargo: "));
        var docenteEncontrado = listDocAmodif.find(function (docente) { return docente.dni === busqueda; });
        console.log("\n");
        if (docenteEncontrado) {
            console.log("Alumnos a cargo del docente ".concat(docenteEncontrado.nombre, " ").concat(docenteEncontrado.apellido, " que dicta ").concat(docenteEncontrado.materias, ":"));
            for (var i = 0; i < listAlumAmodif.length; i++) {
                var materias = listAlumAmodif[i].materias;
                var nombre = listAlumAmodif[i].nombre;
                var apellido = listAlumAmodif[i].apellido;
                var notasAlumno = listAlumAmodif[i].notas;
                for (var j = 0; j < materias.length; j++) {
                    if (materias[j] === docenteEncontrado.materias.toString()) {
                        console.log("  ".concat(nombre, " ").concat(apellido));
                        console.log("".concat(nombre, " ").concat(apellido, " materia:").concat(materias[j]));
                        var notas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
                        var eleccionNota = readline_sync_1.default.keyInSelect(notas, "Selecione nota");
                        notasAlumno.push(eleccionNota + 1);
                        var suma = notasAlumno.reduce(function (accum, eleccionNota) { return accum + eleccionNota; }, 0);
                        var promedio = suma / notasAlumno.length;
                        console.log("Alumno........................  ".concat(nombre, " ").concat(apellido));
                        console.log("Materia:......................  ".concat(materias[j]));
                        console.log("Listado de notas anuales......  ".concat(notasAlumno));
                        console.log("Promedio de todas las notas...  ".concat(promedio.toFixed(1)));
                    }
                }
            }
            fs_1.default.writeFileSync("./directoryData/alumnos.json", JSON.stringify(listAlumAmodif, null, 2));
        }
        else {
            console.log("No se encontro docente con el DNI ingresado");
        }
    };
    return Gestion;
}());
exports.Gestion = Gestion;
