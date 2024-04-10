import Usuario from './Usuario';

class Medico extends Usuario {
    constructor(cedula, usuario, contraseña, nombreCompleto, sexo, edad, correo, idEspecialidad) {
        super(cedula, usuario, contraseña, nombreCompleto, sexo, edad, correo);
        this.idEspecialidad = idEspecialidad;
    }
}

export default Medico;