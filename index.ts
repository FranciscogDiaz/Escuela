import { Gestion } from "./src/Gestor";
import readLineSync from "readline-sync";

console.log("Bienvenido al sistema de Gestion de Legajos Escolar");

console.log("Por favor, marque la opcion deseada en el listado, o bien marque 0 (CANCEL) si desea salir del sistema");

const listado:string = (" 1. Crear Materia\n 2. Matricular Alumno\n 3. Contratar Docente\n 4. Inscribir/Dictar materias\n 5. Modificar datos (alumno o docente)\n 6. Busqueda de Alumno/Docente en el Registro\n 7. Eliminar Alumno/Docente del Registro\n 8. Listado de Alumnos\n 9. Listado de Docentes\n 10. Listado de alumnos por docente\n 11. Listado de Docentes por Alumno\n 12. Listado de alumnos con sus promedios\n  0. CANCEL\n")

console.log(listado)

let opcionElegida = readLineSync.question("Marque la opcion deseada en el listado (-numerada-):  ");

while ((opcionElegida) !== "0") {
    switch (opcionElegida) {
        case "1":
            console.log("Ingrese los datos solicitados para generar una nueva materia a dictar en la institucion: \n");
            Gestion.crearMateria();
            break;
        case "2":
            console.log("Ha optado por matricular un alumno, Ingrese los datos que se piden debajo\n");
            Gestion.crearMatricula();
            break;
        case "3":
            console.log("Ha optado por contratar un docente, Ingrese los datos que se piden debajo\n");
            Gestion.crearContrato();
            break;
        case "4":
            console.log("Opcion para inscribir a un alumno/docente a cursar/dictar una o mas materias\n");
            Gestion.inscribirDictarMaterias();
            break;            
        case "5":
            console.log("Modifique aqui los datos que desea cambiar, con el DNI de la persona\n");
            Gestion.modificarDatos();
            break;
        case "6":
            console.log("Busque por DNI la persona y le mostraremos los datos disponibles\n");
            Gestion.busquedaPersona();
            break;
        case "7":
            console.log("Expulse o Despida una persona mediante la busqueda por DNI\n");
            Gestion.eliminarPersona();
            break;
        case "8":
            console.log("Se muestra por pantalla el listado de alumnos de la institucion\n");
            Gestion.listadoAlumnos();
            break;
        case "9":
            console.log("Se muestra por pantalla el listado de docentes de la institucion\n");
            Gestion.listadoDocentes();
            break;
        case "10":
            console.log("Esta opcion le mostrara en pantalla el listado de Alumnos que tiene un Docente\n");
            Gestion.listadoAlumnosPorDocente();
            break;
        case "11":
            console.log("Esta opcion le mostrara en pantalla el listado de Docentes que tiene un Alumno\n");
            Gestion.listadoDocentesPorAlumno();
            break;            
        case "12":
            console.log("Se muestra por pantalla el listado de alumnos con sus promedios\n");
            Gestion.listadoAlumnosConPromedios();
            break;
        default:
            console.log("Ha hecho un mal ingreso, recuerde que la opcion tiene que ser numerada.-");
    }
    console.log("\n \n");    
    console.log(listado);    
    opcionElegida = readLineSync.question("Marque otra opcion que desee operar: ");
}
console.clear()
console.log("Ha salido del sistema. Gracias por usar nuestros productos.-");