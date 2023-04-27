import { Alumno } from "./Alumno";
import { Docente } from "./Docente";
import { Materia } from "./Materia";
import { escribir, leer, guardar } from "./util";
import fs from "fs";
import readLineSync from "readline-sync";

export class Gestion {
    constructor() { }

    //Genera una nueva materia a dictar/cursar
    static crearMateria(): Materia {
        const nombreMateria = readLineSync.question("Ingrese el nombre de la materia a dictar: ");
        const newMateria = new Materia(nombreMateria);
        const pathMaterias = "./directoryData/materias.json"
        console.log(newMateria);
        guardar(pathMaterias, newMateria);
        return newMateria;
    }

    //Metodo para inscribir un nuevo alumno
    static crearMatricula(): Alumno {
        const nombre = readLineSync.question("Ingrese el nombre: ");
        const apellido = readLineSync.question("Ingrese el apellido: ");
        const dni: number = Number(readLineSync.question("Ingrese el documento: "));

        const newAlumno = new Alumno(nombre, apellido, dni);

        const pathAlumnos = "./directoryData/alumnos.json";
        guardar(pathAlumnos, newAlumno);
        console.log("Ha ingresado un nuevo Alumno al sistema, con los siguientes datos: \n");
        console.log(newAlumno);
        return newAlumno;
    }

    //Metodo para contratar un nuevo docente
    static crearContrato(): Docente {
        const nombre = readLineSync.question("Ingrese el nombre: ");
        const apellido = readLineSync.question("Ingrese el apellido: ");
        const dni: number = Number(readLineSync.question("Ingrese el documento: "));

        const newDocente = new Docente(nombre, apellido, dni);

        const pathDocentes = "./directoryData/docentes.json";
        guardar(pathDocentes, newDocente);
        console.log("Ha ingresado un nuevo Docente al sistema, con los siguientes datos: \n");
        console.log(newDocente);
        return newDocente
    }

    //Este metodo asigna una o mas materias a cursar/dictar por un alumno/docente 
    static inscribirDictarMaterias() {
        const pathAlumnos = "./directoryData/alumnos.json";
        const pathDocente = "./directoryData/docentes.json";
        const pathMaterias = "./directoryData/materias.json"
        const listaAlumoModif = leer(pathAlumnos);
        const listaDocenteModif = leer(pathDocente);
        const listaMateriasModif = leer(pathMaterias);

        const busqueda: number = Number(readLineSync.question("Ingrese el DNI de la persona que desea asignar una o mas materias: "));
        const alumnoEncontrado = listaAlumoModif.findIndex((alumno: Alumno) => alumno.dni === busqueda);
        const alumno = listaAlumoModif[alumnoEncontrado]
        const docenteEncontrado = listaDocenteModif.findIndex((docente: Docente) => docente.dni === busqueda);
        const docente = listaDocenteModif[docenteEncontrado]

        if (alumnoEncontrado >= 0) {
            console.log(alumno);
            console.log("Estas son las materias disponibles en la institucion: \n");
            listaMateriasModif.forEach((nombre: Materia) => {
                console.log("Materia:... ", nombre.materia);
            });
            const eleccion = readLineSync.question("Ingrese la materia que desea inscribirse: ");
            const ubicacionEleccion = listaMateriasModif.findIndex((nombre: Materia) => nombre.materia.toLowerCase() === eleccion.toLowerCase())
            const verMateria = listaMateriasModif[ubicacionEleccion];

            if (ubicacionEleccion >= 0) {
                alumno.materias.push(verMateria.materia);
                console.log("El alumno se ha inscripto correctamente a la materia.- \n");
                console.log(alumno);
                fs.writeFileSync(pathAlumnos, JSON.stringify(listaAlumoModif, null, 2));
            } else {
                console.log("No ingreso una materia disponible, intente nuevamente");
            }
        } else if (docenteEncontrado >= 0) {
            console.log(docente)
            console.log("Estas son las materias disponibles en la institucion: \n");
            listaMateriasModif.forEach((nombre: Materia) => {
                console.log("Materia: ", nombre.materia);
            });
            const eleccion = readLineSync.question("Ingrese la materia que desea dictar: ");
            const ubicacionEleccion = listaMateriasModif.findIndex((nombre: Materia) => nombre.materia.toLowerCase() === eleccion.toLowerCase())
            const verMateria = listaMateriasModif[ubicacionEleccion];
            if (ubicacionEleccion >= 0) {
                docente.materias.push(verMateria.materia);
                console.log("El docente se ha inscripto correctamente a la materia.- \n");
                console.log(docente);
                fs.writeFileSync(pathDocente, JSON.stringify(listaDocenteModif, null, 2));
            } else {
                console.log("No ingreso una materia disponible, intente nuevamente");
            }
        } else {
            console.log(`El alumno/profesor no fue encontrado en el registro.-\n`);
        }
    }

    //Modifica los datos ingresados con anterioridad de un docente/alumno
    static modificarDatos(): any {
        const pathDocentes = "./directoryData/docentes.json";
        const pathDocenteModif = leer(pathDocentes);
        const pathAlumnos = "./directoryData/alumnos.json"
        const pathAlumnoModif = leer(pathAlumnos);

        const busqueda: number = Number(readLineSync.question("Ingrese el DNI de la persona que desea modificar: "));
        const alumnoEncontrado = pathAlumnoModif.findIndex((alumno: Alumno) => alumno.dni === busqueda);
        const docenteEncontrado = pathDocenteModif.findIndex((docente: Docente) => docente.dni === busqueda);

        if (alumnoEncontrado >= 0) {
            const alumno = pathAlumnoModif[alumnoEncontrado];
            console.log("El alumno buscado posee los siguientes datos: ", alumno);
            const opciones = ["Modificar Nombre", "Modificar Apellido", "Modificar DNI"]
            const eleccion: number = readLineSync.keyInSelect(opciones, "Que dato desea modificar?: ")
            const modificar = opciones[eleccion]

            switch (modificar) {
                case "Modificar Nombre":
                    const modifNombre: string = readLineSync.question("Ingrese el nombre del alumno para modificarlo: ");
                    pathAlumnoModif[alumnoEncontrado].nombre = modifNombre;
                    break;
                case "Modificar Apellido":
                    const modifApellido: string = readLineSync.question("Ingrese el apellido del alumno para modificarlo: ");
                    pathAlumnoModif[alumnoEncontrado].apellido = modifApellido;
                    break;
                case "Modificar DNI":
                    const modifDni: string = readLineSync.question("Ingrese el DNI del alumno para modificarlo: ");
                    pathAlumnoModif[alumnoEncontrado].dni = modifDni;
                    break;
                default:
                    console.log("Ha ingresado un valor equivocado, intente nuevamente");
                    break;
            }
            console.log("El alumno quedo modificado de la siguiente forma: \n");
            console.log(alumno);
            fs.writeFileSync(pathAlumnos, JSON.stringify(pathAlumnoModif, null, 2));
        } else if (docenteEncontrado >= 0) {
            const docente = pathDocenteModif[docenteEncontrado];
            console.log("El docente buscado posee los siguientes datos: ", docente);
            const opciones = ["Modificar Nombre", "Modificar Apellido", "Modificar DNI"]
            const eleccion: number = readLineSync.keyInSelect(opciones, "Que dato desea modificar?: ")
            const modificar = opciones[eleccion]

            switch (modificar) {
                case "Modificar Nombre":
                    const modifNombre: string = readLineSync.question("Ingrese el nombre del docente para modificarlo: ");
                    pathDocenteModif[docenteEncontrado].nombre = modifNombre;
                    break;
                case "Modificar Apellido":
                    const modifApellido: string = readLineSync.question("Ingrese el apellido del docente para modificarlo: ");
                    pathDocenteModif[docenteEncontrado].apellido = modifApellido;
                    break;
                case "Modificar DNI":
                    const modifDni: string = readLineSync.question("Ingrese el DNI del docente para modificarlo: ");
                    pathDocenteModif[docenteEncontrado].dni = modifDni;
                    break;
                default:
                    console.log("Ha ingresado un valor equivocado, intente nuevamente");
                    break;
            }
            console.log("El docente quedo modificado de la siguiente forma: \n");
            console.log(docente);
            fs.writeFileSync(pathDocentes, JSON.stringify(pathDocenteModif, null, 2));
        } else {
            console.log("No existe en el registro una persona con ese DNI");
        }
    }

    //Busca un alumno/docente que este inscripto en la institucion, de lo contrario envia un mensaje de que la persona no se encuentra registrada
    static busquedaPersona() {
        const pathDocentes = "./directoryData/docentes.json";
        const pathDocenteModif = leer(pathDocentes);
        const pathAlumnos = "./directoryData/alumnos.json"
        const pathAlumnoModif = leer(pathAlumnos);

        const busqueda: number = Number(readLineSync.question("Ingrese el DNI de la persona que desea modificar: "));
        const alumnoEncontrado = pathAlumnoModif.findIndex((alumno: Alumno) => alumno.dni === busqueda);
        const docenteEncontrado = pathDocenteModif.findIndex((docente: Docente) => docente.dni === busqueda);

        if (alumnoEncontrado >= 0) {
            const datosAlumno: Alumno = pathAlumnoModif[alumnoEncontrado];
            console.log("Alumno: \n");
            console.log(datosAlumno);
            return datosAlumno
        } else if (docenteEncontrado >= 0) {
            const datosDocente = pathDocenteModif[docenteEncontrado];
            console.log("Docente: \n");
            console.log(datosDocente);
            return datosDocente
        } else {
            console.log("No existe en el registro un alumno/profesor con ese DNI");
        }
    }

    //Despide o Expulsa un Docente/Alumno del registro
    static eliminarPersona(): void {
        const pathDocentes = "./directoryData/docentes.json";
        const pathDocenteModif = leer(pathDocentes);
        const pathAlumnos = "./directoryData/alumnos.json"
        const pathAlumnoModif = leer(pathAlumnos);

        const busqueda: number = Number(readLineSync.question("Ingrese el DNI de la persona que esta buscando eliminar: "));
        const alumnoEncontrado = pathAlumnoModif.findIndex((alumno: Alumno) => alumno.dni === busqueda);
        const docenteEncontrado = pathDocenteModif.findIndex((docente: Docente) => docente.dni === busqueda);

        if (alumnoEncontrado >= 0) {
            const datosAlumno = pathAlumnoModif[alumnoEncontrado];
            console.log("Datos del alumno buscado: \n");
            console.log(datosAlumno);
            const respuesta = readLineSync.keyInYN("Esta seguro de eliminar el alumno del archivo? (Esta opcion no se puede deshacer).\n");
            if (respuesta) {
                pathAlumnoModif.splice(alumnoEncontrado, 1);
                escribir(pathAlumnoModif, pathAlumnos)
                console.log("El alumno fue eliminado del sistema");
            } else {
                console.log("no eliminaste a nadie");
            }
        } else if (docenteEncontrado >= 0) {
            const datosDocente = pathDocenteModif[docenteEncontrado];
            console.log("Datos del docente buscado: \n");
            console.log(datosDocente);
            const respuesta = readLineSync.keyInYN("Esta seguro de eliminar el docente del archivo? (Esta opcion no se puede deshacer).\n");
            if (respuesta) {
                pathDocenteModif.splice(datosDocente, 1);
                escribir(pathDocenteModif, pathDocentes)
                console.log("El docente fue eliminado del sistema");
            } else {
                console.log("no eliminaste a nadie");
            }
        } else {
            console.log(`El alumno/profesor no fue eliminado del sistema`);
        }
    }

    //Lista por pantalla los alumnos inscriptos
    static listadoAlumnos() {
        const pathAlumnos = "./directoryData/alumnos.json"
        const pathAlumnoModif = leer(pathAlumnos);
        console.log("Alumnos inscriptos en la institucion: \n");
        pathAlumnoModif.forEach((alumno: Alumno) => {
            console.log(`Nombre y Apellido:...... ${alumno.nombre} ${alumno.apellido}`);
            console.log(`DNI:.................... ${alumno.dni}`);
            console.log(`ID de la institucion.... ${alumno.idLegajo}`);
            console.log(`Materias que cursa...... ${alumno.materias}\n`);
        });
    }

    //Lista por pantalla los docentes inscriptos
    static listadoDocentes() {
        const listadoDocentes = leer("./directoryData/docentes.json");
        console.log("Docentes inscriptos en la institucion: \n");
        listadoDocentes.forEach((docente: Docente) => {
            console.log(`Nombre y Apellido:...... ${docente.nombre} ${docente.apellido}`);
            console.log(`DNI:.................... ${docente.dni}`);
            console.log(`ID de la institucion.... ${docente.idLegajo}`);
            console.log(`Materias que dicta...... ${docente.materias}\n`);
        });
    }

    // listado de alumnos por docente
    static listadoAlumnosPorDocente() {
        const listDocAmodif = leer("./directoryData/docentes.json");
        const listAlumAmodif = leer("./directoryData/alumnos.json");

        const busqueda: number = Number(readLineSync.question("Ingrese el DNI del docente para ver los alumnos a cargo: "));
        const docenteEncontrado: Docente = listDocAmodif.find((docente: { dni: number }) => docente.dni === busqueda);
        console.log("\n");

        if (docenteEncontrado) {
            console.log(`Alumnos a cargo del docente ${docenteEncontrado.nombre} ${docenteEncontrado.apellido} que dicta ${docenteEncontrado.materias}:`);
            for (let i = 0; i < listAlumAmodif.length; i++) {
                const materias: string[] = listAlumAmodif[i].materias;
                const nombre: string[] = listAlumAmodif[i].nombre;
                const apellido: string[] = listAlumAmodif[i].apellido;
                for (let j = 0; j < materias.length; j++) {
                    if (materias[j] === docenteEncontrado.materias.toString()) {
                        console.log(`  ${nombre} ${apellido}`);
                    }
                }
            }
        } else {
            console.log("No se encontro docente con el DNI ingresado");
        }
    }

    //Lista los docentes que tiene un alumno
    static listadoDocentesPorAlumno() {
        const listDocAmodif = leer("./directoryData/docentes.json");
        const listAlumAmodif = leer("./directoryData/alumnos.json");

        const busqueda: number = Number(readLineSync.question("Ingrese el DNI del alumno para ver los docentes a cargo: "));
        const alumnoEncontrado: Alumno = listAlumAmodif.find((alumno: { dni: number }) => alumno.dni === busqueda);
        console.log("\n");        

        if (alumnoEncontrado) {
            console.log(`Docentes que tiene el alumno ${alumnoEncontrado.nombre} ${alumnoEncontrado.apellido} que cursa ${alumnoEncontrado.materias}:`);
            for (let i = 0; i < listDocAmodif.length; i++) {
                const materiasDocente: Materia[] = listDocAmodif[i].materias;                
                if (materiasDocente.some((materia) => alumnoEncontrado.materias.includes(materia))) {
                    console.log(`  ${listDocAmodif[i].nombre} ${listDocAmodif[i].apellido}`);
                }
            }
        } else {
            console.log("No se encontro docente con el DNI ingresado");
        }
    }

    //Metodo para generar el promedio obtenido con las materias que cursa un alumno
    static listadoAlumnosConPromedios() {
        const listDocAmodif = leer("./directoryData/docentes.json");
        const listAlumAmodif = leer("./directoryData/alumnos.json");

        const busqueda: number = Number(readLineSync.question("Ingrese el DNI del docente para ver los alumnos a cargo: "));
        const docenteEncontrado: Docente = listDocAmodif.find((docente: { dni: number }) => docente.dni === busqueda);
        console.log("\n");

        if (docenteEncontrado) {
            console.log(`Alumnos a cargo del docente ${docenteEncontrado.nombre} ${docenteEncontrado.apellido} que dicta ${docenteEncontrado.materias}:`);
            for (let i = 0; i < listAlumAmodif.length; i++) {
                const materias: string[] = listAlumAmodif[i].materias;
                const nombre: string[] = listAlumAmodif[i].nombre;
                const apellido: string[] = listAlumAmodif[i].apellido;
                let notasAlumno: number[] = listAlumAmodif[i].notas;                
                for (let j = 0; j < materias.length; j++) {
                    if (materias[j] === docenteEncontrado.materias.toString()) {
                        console.log(`  ${nombre} ${apellido}`);
                        console.log(`${nombre} ${apellido} materia:${materias[j]}`);
                        const notas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
                        let eleccionNota = readLineSync.keyInSelect(notas, "Selecione nota");
                        
                        notasAlumno.push(eleccionNota+1);

                        const suma: number = notasAlumno.reduce((accum: number, eleccionNota: number) => accum + eleccionNota, 0);
                        
                        const promedio = suma / notasAlumno.length; 

                        console.log(`Alumno........................  ${nombre} ${apellido}`);
                        console.log(`Materia:......................  ${materias[j]}`);
                        console.log(`Listado de notas anuales......  ${notasAlumno}`);
                        console.log(`Promedio de todas las notas...  ${promedio.toFixed(1)}`);
                    }
                }
            }
            fs.writeFileSync("./directoryData/alumnos.json", JSON.stringify(listAlumAmodif, null, 2));
        } else {
            console.log("No se encontro docente con el DNI ingresado");
        }
    }
}