const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripcion de la Tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs')
    .command('crear', 'Crea una nueva Tarea', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Listar todas las tareas', {
        completado
    })
    .command('borrar', 'Borra una tarea de la Lista', {
        descripcion
    })
    .argv;


module.exports = {
    argv
}