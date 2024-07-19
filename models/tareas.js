const Tarea = require('./tarea');

/**
 * _listado:
 *      {'uuid-314243-434134: {id:12, desc: asc, completadoEn: 92231}'}
 */

class Tareas{
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach((keys) => {
            const tarea = this._listado[keys];
            listado.push( tarea );
        })


        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '' ){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTareas( desc = '' ){
        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto( tareas = [] ){
        tareas.forEach((tarea, i ) => {
            let indx = `${i + 1}.`.green;
            let estado = (!tarea.completadoEn) ? "Pendiente".red : "Completado".green;
            console.log(`${indx} ${tarea.desc} :: ${estado}`);
        })
    }

    listarPendientesCompletadas( completadas = true ){
        let count = 0;
        
        this.listadoArr.forEach((tarea) => {
            if(completadas && tarea.completadoEn){
                count++;
                console.log(`${(count + ".").green} ${tarea.desc} :: ${JSON.stringify(tarea.completadoEn).green}`);
            } 
            if(!completadas && !tarea.completadoEn){
                count++;
                console.log(`${(count + ".").red} ${tarea.desc} :: ${JSON.stringify(tarea.completadoEn).red}`);
            } 
        })
    }

    toggleCompletadas( ids = [] ){
        ids.forEach((id) => {
            const tarea = this._listado[id];

            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach((tarea) => {
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;