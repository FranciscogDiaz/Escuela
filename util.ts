import fs from "fs";

export function check(path: string | any): boolean {
    if (fs.existsSync(path)) {
        return true
    }
    else {
        console.log('no existe');
        return false
    }
}

export function escribir(data: any, path: string) {
    return fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

export function leer(path: string) {
    try {
        if (check(path)) {
            let result = JSON.parse(fs.readFileSync(path, "utf-8"));
            return result
        }
    } catch (error) {
        console.log(error);
    }
}

export function guardar(path: string, data: any) {
    if (check(path)) {
        let dataToSave = [...leer(path), data];
        return escribir(dataToSave, path)
    } else {
        console.log('creando...');
        return escribir([data], path);
    }
}



module.exports = { check, escribir, leer, guardar };
