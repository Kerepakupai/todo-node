const fs = require('fs');
const colors = require('colors/safe');

let listadoToDo = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoToDo);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw err;
        // console.log('Se guardaron los Datos!');
    });

}

const leerDB = () => {
    try {
        listadoToDo = require('../db/data.json');
    } catch (error) {
        listadoToDo = [];
    }
}

const crear = (descripcion) => {
    leerDB();

    let tarea = {
        descripcion,
        completado: false
    }
    listadoToDo.push(tarea);

    guardarDB();

    return tarea;
}

const getListado = (completado = 'all') => {
    leerDB();
    let listado = [];
    switch (completado) {
        case 'true':
            listado = listadoToDo.filter(tarea => tarea.completado === 'true');
            break;

        case 'false':
            listado = listadoToDo.filter(tarea => tarea.completado === false);
            break;
        default:
            listado = listadoToDo;
            break;
    }
    return listado;
}

const actualizar = (descripcion, completado = true) => {
    leerDB();

    let index = getIndex(descripcion);

    if (index >= 0) {
        listadoToDo[index].completado = completado;
        guardarDB();
        console.log(colors.green(`Tarea ${listadoToDo[index].descripcion} Actualizada`));
    } else {
        console.log(colors.red('No se encontro la tarea indicada'));
    }
}

const borrar = (descripcion) => {
    leerDB();

    let index = getIndex(descripcion);

    if (index >= 0) {
        listadoToDo.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const getIndex = (descripcion) => listadoToDo.findIndex(tarea => tarea.descripcion === descripcion);

module.exports = {
    crear,
    guardarDB,
    leerDB,
    getListado,
    actualizar,
    borrar
}