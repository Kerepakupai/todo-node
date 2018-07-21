const argv = require('./config/yargs').argv;
const todo = require('./to-do/to-do');
const colors = require('colors/safe');

const comando = argv._[0].toLowerCase();

switch (comando) {
    case 'crear':
        let tarea = todo.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'actualizar':
        todo.actualizar(argv.descripcion, argv.completado);
        break;

    case 'listar':

        let listado = todo.getListado(argv.completado);

        listado.forEach(tarea => {
            console.log(colors.green('========== To Do ==============='));
            console.log(tarea.descripcion);
            console.log(`Completado: ${tarea.completado}`);
            console.log(colors.green('================================\n\n'));
        });
        break;

    case 'borrar':
        let borrado = todo.borrar(argv.descripcion);
        if (borrado) {
            console.log(colors.green('Tarea Borrada'));
        } else {
            console.log(colors.red('No se pudo eliminar la Tarea'));
        }
        break;
    default:
        console.log('No se reconoce comando');
        break;
}