import Usuario from './Usuario';

class Paciente extends Usuario {
    constructor(cedula, usuario, contraseña, nombreCompleto, sexo, edad, correo, fechaNacimiento, direccion) {
        super(cedula, usuario, contraseña, nombreCompleto, sexo, edad, correo);
        this.fechaNacimiento = fechaNacimiento;
        this.direccion = direccion;
    }
}

export default Paciente;